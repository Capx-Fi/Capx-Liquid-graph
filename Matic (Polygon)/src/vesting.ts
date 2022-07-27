import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  Vesting,
  CreateVest,
  TransferLock,
  Withdraw,
  ProjectInfo
} from "../generated/Vesting/Vesting"
import {
  Project,
  Lock,
  Derivative,
  Withdrawal,
  Transfer
} from "../generated/schema"
import { log } from "@graphprotocol/graph-ts"
import {Master} from "../generated/Master/Master"
let MasterAddress = Address.fromString("0x9cCFc9B742856fE8E5dc520Da7D9377E1a10e77d")

function generateID(_user: string, _ticker: string): string {
    return _user.toLowerCase().concat("-LOCK-").concat(_ticker.toLowerCase());
  }

// Vesting Event Handlers
export function handleWithdrawLock(event: Withdraw): void {
    // Getting all the required data from the Event.
    let _txHash = event.transaction.hash;
    let _userAddress = event.params.userAddress;
    let _amount = event.params.amount;
    let _wrappedTokenAddress = event.params.wrappedTokenAddress.toHexString();
    let _unlockTime = event.params.unlockTime;
    let _vestID = event.params.vestID;
  
    // Creating a unique Lock ID, i.e. a combination of the Asset Address & VestID.
    let _userID = generateID(_wrappedTokenAddress, _vestID.toString());
  
    // Loading the Lock Asset.
    let lock = Lock.load(_userID);
    if (lock) {
      if(lock.unlockTime === _unlockTime && lock.address === _userAddress){
        let amount = lock.tokenAmount;
        let lockTotalWithdrawn = lock.totalWithdrawn;
        lock.tokenAmount = amount.minus(_amount);
        lock.totalWithdrawn = lockTotalWithdrawn.plus(_amount);
      }
      lock.save();
      // Loading Derivative
      let derivative = Derivative.load(_wrappedTokenAddress);
      if(derivative!=null){
        // Loading Withdraw Entity
        let withdrawID = derivative.projectID.toLowerCase()
                        .concat(
                          "-"
                        ).concat(
                          _userAddress.toHexString().toLowerCase()
                        ).concat(
                          "|"
                        ).concat(
                          _txHash.toHexString().toLowerCase()
                        );
        let withdraw = new Withdrawal(withdrawID);
        withdraw.txHash = _txHash;
        withdraw.token = Address.fromHexString(_wrappedTokenAddress);
        withdraw.vestID = _vestID;
        withdraw.from = _userAddress;
        withdraw.amount = _amount;
        withdraw.save();
      }
    }
  }
  
  export function handleTransferLock(event: TransferLock): void {
    // Getting all the required data from the Event.
    let _txHash = event.transaction.hash;
    let _userAddress = event.transaction.from;
    let _wrappedTokenAddress = event.params.wrappedTokenAddress.toHexString();
    let _receiverAddress = event.params.receiverAddress;
    let _vestID = event.params.vestID;
  
    // Check the corresponding derivative asset exists or not.
    if (_receiverAddress != Address.fromString("0xA93B2C7Db390cf6fC20d1D1B2C23DfC4DC3222c5")){
      
      // Creating a unique Lock ID, i.e. a combination of the ProjectID & VestID.
      let _lockID = generateID(_wrappedTokenAddress,_vestID.toString());
      // If the project exists. Check the corresponding Lock exists or not.
      let lock = Lock.load(_lockID);
      if(lock) {
        lock.address = _receiverAddress;
        lock.save();
        // Loading Derivative
        let derivative = Derivative.load(_wrappedTokenAddress);
        if (derivative!= null) {
          // Create Transfer Entity
          let transferID = derivative.projectID.toLowerCase()
                          .concat(
                            "-"
                          ).concat(
                            _userAddress.toHexString().toLowerCase()
                          ).concat(
                            "|"
                          ).concat(
                            _txHash.toHexString().toLowerCase()
                          );
          let transfer = new Transfer(transferID);
          transfer.txHash = _txHash;
          transfer.token = Address.fromHexString(_wrappedTokenAddress);
          transfer.vestID = _vestID;
          transfer.from = _userAddress;
          transfer.to = _receiverAddress;
          transfer.amount = lock.tokenAmount;
          transfer.save();
        }
      }
    }
  }
  
  export function handleCreateVestLock(event: CreateVest): void {
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
    // let project = Project.load(_projectID);
    // if(project != null){
      // Creating a unique Lock ID, i.e. a combination of the ProjectID & VestID.
      let _lockID = generateID(_projectAddress,_vestID.toString());
  
      // If the project exists. Check the corresponding Lock exists or not.
      let lock = Lock.load(_lockID);
      if(!lock) {
        // If the Lock doesn't exist, create one.
        lock = new Lock(_lockID);
        lock.address = _userAddress;
        lock.tokenAmount = _tokenAmount;
        lock.totalAllocated = _tokenAmount;
        lock.totalWithdrawn = BigInt.fromI32(0);
        lock.unlockTime = _unlockTime;
        lock.vestID = _vestID;
        lock.projectID = _projectID //project.id;
      }
      lock.save();
    //   project.save();
    // }
  }

  export function handleProjectInfoVesting(event: ProjectInfo): void {
    let _projectTokenAddress = event.params.tokenAddress;
    // let _projectOwner = event.params.creator;
    let masterInstance = Master.bind(MasterAddress)
    let _projectOwner = masterInstance.assetAddresstoProjectOwner(_projectTokenAddress)
    let _projectID = generateID(_projectOwner.toHexString(),_projectTokenAddress.toHexString())

    let project = Project.load(_projectID);
    if(project == null){
      project = new Project(_projectID);
    project.projectOwnerAddress = _projectOwner;
    project.projectTokenAddress = _projectTokenAddress;
    project.projectTokenTicker = "?";
    project.projectTokenDecimal = BigInt.fromI32(-1);
    project.projectName = "?";
    project.projectDocHash = "?";
    }
    project.save();
  }