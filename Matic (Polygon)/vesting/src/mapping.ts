import { BigInt,Address } from "@graphprotocol/graph-ts"
import {
  Vesting,
  AdminChanged,
  BeaconUpgraded,
  CreateVest,
  OwnershipTransferred,
  ProjectInfo,
  TransferLock,
  Upgraded,
  Withdraw
} from "../generated/Vesting/Vesting"
import {
  Project,
  Derivative,
  UserHoldings
} from "../generated/schema"

function generateID(_user: string, _ticker: string): string {
  return _user.concat("-LOCK-").concat(_ticker);
}

export function handleAdminChanged(event: AdminChanged): void {}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleCreateVest(event: CreateVest): void {
  // Getting all the required data from the Event.
  let _userAddress = event.params.userAddress;
  let _projectCreator = event.params.creator;
  let _projectAddress = event.params.assetAddress.toHexString();
  let _tokenAmount = event.params.userAmount;
  let _unlockTime = event.params.unlockTime;
  let _vestID = event.params.vestID;

  // Generting a Unique Project ID, i.e. a combination of Project Creator & Project Address
  let _projectID = generateID(_projectCreator.toHexString(), _projectAddress);

  // Checking if the project already exists.
  let project = Project.load(_projectID);
  if(project != null){
    // If the project exists. Check the corresponding derivative asset exists or not.
    let derivative = Derivative.load(_projectAddress);
    if (derivative == null){
      // If the derivative asset doesn't exist, create one.
      derivative = new Derivative(_projectAddress);
      derivative.totalLockedSupply = BigInt.fromI32(0);
      derivative.projectID = project.id;
      derivative.save();
    }
    // Increase the Total Supply of the Derivative Asset.
    let derivativeSupply = derivative.totalLockedSupply;
     derivative.totalLockedSupply = derivativeSupply.plus(_tokenAmount);
    // Creating a unique User ID, i.e. a combination of the User Address & the Wrapped Asset Address.
    let userHoldingsID = generateID(generateID(_userAddress.toHexString(), _projectAddress),_vestID.toString());

    // Checking if the User already exists w.r.t the Wrapped Asset
    let userHoldings = UserHoldings.load(userHoldingsID);
    if (userHoldings == null){
      // If the User doesn't exist, create one.
      userHoldings = new UserHoldings(userHoldingsID);
      userHoldings.tokenAmount = BigInt.fromI32(0);
      userHoldings.address = _userAddress;
      userHoldings.unlockTime = _unlockTime;
      userHoldings.vestID = _vestID;
      userHoldings.derivativeID = derivative.id;
    }
    // Increase the Wrapped Asset Holdings of the User.
    let userTokenAmount = userHoldings.tokenAmount;
    userHoldings.tokenAmount = userTokenAmount.plus(_tokenAmount);
    userHoldings.save();
    derivative.save();
  }
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleProjectInfo(event: ProjectInfo): void {
  // Getting all the required data from the Event.
  let _projectTokenAddress = event.params.tokenAddress;
  let _projectOwner = event.params.creator;

  // Generting a Unique Project ID, i.e. a combination of Project Creator & Project Address
  let _projectID = generateID(_projectOwner.toHexString(),_projectTokenAddress.toHexString())

  // Checking if the project already exists.
  let project = Project.load(_projectID);
  if (project == null) {
    // If the Project doesn't exist, create one.
    project = new Project(_projectID);
    project.projectOwnerAddress = _projectOwner;
    project.projectTokenAddress = _projectTokenAddress;
  }
  project.save();
}

export function handleTransferLock(event: TransferLock): void {
  // Getting all the required data from the Event.
  let _userAddress = event.params.userAddress;
  let _wrappedTokenAddress = event.params.wrappedTokenAddress.toHexString();
  let _receiverAddress = event.params.receiverAddress;
  let _transferAmount = event.params.amount;
  let _unlockTime = event.params.unlockTime;
  let _vestID = event.params.vestID;

  // Check the corresponding derivative asset exists or not.
  if (_receiverAddress != Address.fromString("0x5d985753aE3691a0A94d38eC2F12793006097416")){
    let derivative = Derivative.load(_wrappedTokenAddress);
    if(derivative != null){
      // Creating a unique User ID, i.e. a combination of the User Address & the Wrapped Asset Address.
      let senderID = generateID(generateID(_userAddress.toHexString(), _wrappedTokenAddress),_vestID.toString());

      // Retrieving the User w.r.t the Wrapped Asset
      let senderUserHoldings = UserHoldings.load(senderID);
      if(senderUserHoldings != null){
        // Updating the Balance of Sender Address
        let senderTokenAmount = senderUserHoldings.tokenAmount;
        senderUserHoldings.tokenAmount = senderTokenAmount.minus(_transferAmount);
        senderUserHoldings.save();

        // Creating a unique User ID, i.e. a combination of the User Address & the Wrapped Asset Address.
        let receiverID = generateID(generateID(_receiverAddress.toHexString(), _wrappedTokenAddress),_vestID.toString());

        // Checking if the User already exists w.r.t the Wrapped Asset
        let receiverUserHoldings = UserHoldings.load(receiverID);
        if (receiverUserHoldings == null){
          // If the User doesn't exist, create one.
          receiverUserHoldings = new UserHoldings(receiverID);
          receiverUserHoldings.address = _receiverAddress;
          receiverUserHoldings.tokenAmount = BigInt.fromI32(0);
          receiverUserHoldings.unlockTime = _unlockTime;
          receiverUserHoldings.derivativeID = derivative.id;
        }

        // Updating the Balance of Receiver Address
        let receiverTokenAmount = receiverUserHoldings.tokenAmount;
        receiverUserHoldings.tokenAmount = receiverTokenAmount.plus(_transferAmount);
        receiverUserHoldings.save();
      }
      derivative.save();
    }
  }
}

export function handleUpgraded(event: Upgraded): void {}

export function handleWithdraw(event: Withdraw): void {
  // Getting all the required data from the Event.
  let _userAddress = event.params.userAddress;
  let _amount = event.params.amount;
  let _wrappedTokenAddress = event.params.wrappedTokenAddress.toHexString();
  let _unlockTime = event.params.unlockTime;
  let _vestID = event.params.vestID;

  // Loading the Derivative Asset.
  let derivative = Derivative.load(_wrappedTokenAddress);
  if(derivative != null){
    // Decreasing the Total Supply of the Derivative Asset.
    let derivativeTotalSupply = derivative.totalLockedSupply;
    derivative.totalLockedSupply = derivativeTotalSupply.minus(_amount);

    // Creating a unique User ID, i.e. a combination of the User Address & the Wrapped Asset Address.
    let userID = generateID(generateID(_userAddress.toHexString(), _wrappedTokenAddress), _vestID.toString());

    // Retrieving the User w.r.t the Wrapped Asset
    let userHoldings = UserHoldings.load(userID);
    if(userHoldings != null){
      // Updating the Balance of User Address
      let userTokenAmount = userHoldings.tokenAmount;
      userHoldings.tokenAmount = userTokenAmount.minus(_amount);
      userHoldings.save();
    }
    derivative.save();
  }
}