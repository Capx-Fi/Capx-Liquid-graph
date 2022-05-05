import { BigInt } from "@graphprotocol/graph-ts"
import {
  Master,
  AdminChanged,
  BeaconUpgraded,
  OwnershipTransferred,
  ProjectInfo,
  Upgraded
} from "../generated/Master/Master"
import { Project } from "../generated/schema"

export function generateID(_user: string, _ticker: string): string {
  return _user.concat("-LOCK-").concat(_ticker);
}

export function handleAdminChanged(event: AdminChanged): void {}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleProjectInfo(event: ProjectInfo): void {
  // Getting all the required data from the Event.
  let _projectName = event.params.name.toString();
  let _projectTokenAddress = event.params.tokenAddress;
  let _projectTokenTicker = event.params.tokenTicker.toString();
  let _projectDocHash = event.params.documentHash.toString();
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
    project.projectName = _projectName;
    project.projectTokenAddress = _projectTokenAddress;
    project.projectTokenTicker = _projectTokenTicker;
    project.projectDocHash = _projectDocHash;
    project.projectTokenDecimal = _projectDecimal;
  }
  project.save();
}

export function handleUpgraded(event: Upgraded): void {}