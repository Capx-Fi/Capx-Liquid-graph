import { BigInt,Address } from "@graphprotocol/graph-ts"
import {
  Controller,
  AdminChanged,
  BeaconUpgraded,
  CreateVest,
  OwnershipTransferred,
  ProjectInfo,
  TransferWrapped,
  Upgraded,
  Withdraw
} from "../generated/Controller/Controller"
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
  let _wrappedTokenAddress = event.params.wrappedERC20Address.toHexString();
  let _wrappedTokenTicker = event.params.wrappedAssetTicker.toString();

  // Generting a Unique Project ID, i.e. a combination of Project Creator & Project Address
  let _projectID = generateID(_projectCreator.toHexString(), _projectAddress);

  // Checking if the project already exists.
  let project = Project.load(_projectID);
  if(project != null){
    // If the project exists. Check the corresponding derivative asset exists or not.
    let derivative = Derivative.load(_wrappedTokenAddress);
    if (derivative == null){
      // If the derivative asset doesn't exist, create one.
      derivative = new Derivative(_wrappedTokenAddress);
      derivative.wrappedTokenTicker = _wrappedTokenTicker;
      derivative.totalSupply = BigInt.fromI32(0);
      derivative.projectID = project.id;
      derivative.unlockTime = _unlockTime;
      derivative.save();
    }
    // Increase the Total Supply of the Derivative Asset.
    let derivativeSupply = derivative.totalSupply;
     derivative.totalSupply = derivativeSupply.plus(_tokenAmount);
    // Creating a unique User ID, i.e. a combination of the User Address & the Wrapped Asset Address.
    let userHoldingsID = generateID(_userAddress.toHexString(), _wrappedTokenAddress);

    // Checking if the User already exists w.r.t the Wrapped Asset
    let userHoldings = UserHoldings.load(userHoldingsID);
    if (userHoldings == null){
      // If the User doesn't exist, create one.
      userHoldings = new UserHoldings(userHoldingsID);
      userHoldings.tokenAmount = BigInt.fromI32(0);
      userHoldings.address = _userAddress;
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
  let _projectTokenTicker = event.params.tokenTicker.toString();
  let _projectOwner = event.params.creator;
  let _projectDecimal = event.params.tokenDecimal;

  // Generting a Unique Project ID, i.e. a combination of Project Creator & Project Address
  let _projectID = generateID(_projectOwner.toHexString(),_projectTokenAddress.toHexString())

  // Checking if the project already exists.
  let project = Project.load(_projectID);
  if (project == null) {
    // If the Project doesn't exist, create one.
    project = new Project(_projectID);
    project.projectOwnerAddress = _projectOwner;
    project.projectTokenAddress = _projectTokenAddress;
    project.projectTokenTicker = _projectTokenTicker;
    project.projectTokenDecimal = _projectDecimal;
  }
  project.save();
}

export function handleTransferWrapped(event: TransferWrapped): void {
  // Getting all the required data from the Event.
  let _userAddress = event.params.userAddress;
  let _wrappedTokenAddress = event.params.wrappedTokenAddress.toHexString();
  let _receiverAddress = event.params.receiverAddress;
  let _transferAmount = event.params.amount;

  // Check the corresponding derivative asset exists or not.
  if (_receiverAddress != Address.fromString("0x30B9A8279298Ba8d37Bf76b9f2A805D656fC1C07")){
    let derivative = Derivative.load(_wrappedTokenAddress);
    if(derivative != null){
      // Creating a unique User ID, i.e. a combination of the User Address & the Wrapped Asset Address.
      let senderID = generateID(_userAddress.toHexString(), _wrappedTokenAddress);

      // Retrieving the User w.r.t the Wrapped Asset
      let senderUserHoldings = UserHoldings.load(senderID);
      if(senderUserHoldings != null){
        // Updating the Balance of Sender Address
        let senderTokenAmount = senderUserHoldings.tokenAmount;
        senderUserHoldings.tokenAmount = senderTokenAmount.minus(_transferAmount);
        senderUserHoldings.save();

        // Creating a unique User ID, i.e. a combination of the User Address & the Wrapped Asset Address.
        let receiverID = generateID(_receiverAddress.toHexString(), _wrappedTokenAddress);

        // Checking if the User already exists w.r.t the Wrapped Asset
        let receiverUserHoldings = UserHoldings.load(receiverID);
        if (receiverUserHoldings == null){
          // If the User doesn't exist, create one.
          receiverUserHoldings = new UserHoldings(receiverID);
          receiverUserHoldings.address = _receiverAddress;
          receiverUserHoldings.tokenAmount = BigInt.fromI32(0);
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

  // Loading the Derivative Asset.
  let derivative = Derivative.load(_wrappedTokenAddress);
  if(derivative != null){
    // Decreasing the Total Supply of the Derivative Asset.
    let derivativeTotalSupply = derivative.totalSupply;
    derivative.totalSupply = derivativeTotalSupply.minus(_amount);

    // Creating a unique User ID, i.e. a combination of the User Address & the Wrapped Asset Address.
    let userID = generateID(_userAddress.toHexString(), _wrappedTokenAddress);

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