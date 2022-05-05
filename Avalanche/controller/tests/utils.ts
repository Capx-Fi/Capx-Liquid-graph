import {Address, ethereum, JSONValue, Value, json, Bytes, } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as/assembly/index";

import {Project, Derivative, UserHoldings} from "../generated/schema";
import {ProjectInfo, CreateVest, TransferWrapped, Withdraw} from "../generated/Controller/Controller";
import {handleProjectInfo, handleCreateVest, handleTransferWrapped, handleWithdraw} from "../src/mapping";

export function handleProjectInfos(events: ProjectInfo[]): void {
    events.forEach(event => {
        handleProjectInfo(event);
    });
}

export function handleCreateVests(events: CreateVest[]): void {
    events.forEach(event => {
        handleCreateVest(event);
    });
}

export function handleTransferWrappers(events: TransferWrapped[]): void {
    events.forEach(event => {
        handleTransferWrapped(event);
    });
}

export function handleWithdraws(events: Withdraw[]): void {
    events.forEach(event => {
        handleWithdraw(event);
    });
}

export function createNewProjectInfoEvent(
    tokenAddress: Address, 
    tokenTicker: string, 
    creator: Address, 
    tokenDecimal: i32
): ProjectInfo {
    let newEvent = changetype<ProjectInfo>(newMockEvent());
    newEvent.parameters = new Array();
    let _owner = new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator));
    let _token = new ethereum.EventParam("tokenAddress", ethereum.Value.fromAddress(tokenAddress));
    let _ticker = new ethereum.EventParam("tokenTicker", ethereum.Value.fromString(tokenTicker));
    let _decimal = new ethereum.EventParam("tokenDecimal", ethereum.Value.fromI32(tokenDecimal));

    newEvent.parameters.push(_token);
    newEvent.parameters.push(_ticker);
    newEvent.parameters.push(_owner);
    newEvent.parameters.push(_decimal);

    return newEvent;
}

export function createNewCreateVestEvent(
    assetAddress: Address,
    creator: Address, 
    userAddress: Address, 
    userAmount: i32,
    unlockTime: i32,
    wrappedERC20Address: Address, 
    wrappedAssetTicker: string,  
    transferable: boolean
): CreateVest {
    let newEvent = changetype<CreateVest>(newMockEvent());
    newEvent.parameters = new Array();
    let assetAddress_ = new ethereum.EventParam("assetAddress", ethereum.Value.fromAddress(assetAddress));
    let creator_ = new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator));
    let userAddress_ = new ethereum.EventParam("userAddress", ethereum.Value.fromAddress(userAddress));
    let userAmount_ = new ethereum.EventParam("userAmount", ethereum.Value.fromI32(userAmount));
    let unlockTime_ = new ethereum.EventParam("unlockTime", ethereum.Value.fromI32(unlockTime));
    let wrappedERC20Address_ = new ethereum.EventParam("wrappedERC20Address", ethereum.Value.fromAddress(wrappedERC20Address));
    let wrappedAssetTicker_ = new ethereum.EventParam("wrappedAssetTicker", ethereum.Value.fromString(wrappedAssetTicker));
    let transferable_ = new ethereum.EventParam("transferable", ethereum.Value.fromBoolean(transferable));

    newEvent.parameters.push(assetAddress_);
    newEvent.parameters.push(creator_);
    newEvent.parameters.push(userAddress_);
    newEvent.parameters.push(userAmount_);
    newEvent.parameters.push(unlockTime_);
    newEvent.parameters.push(wrappedERC20Address_);
    newEvent.parameters.push(wrappedAssetTicker_);
    newEvent.parameters.push(transferable_);

    return newEvent;
}

export function createNewTransferWrappedEvent(
    userAddress: Address, 
    wrappedTokenAddress: Address, 
    receiverAddress: Address,
    amount: i32 
): TransferWrapped {
    let newEvent = changetype<TransferWrapped>(newMockEvent());
    newEvent.parameters = new Array();
    let userAddress_ = new ethereum.EventParam("userAddress", ethereum.Value.fromAddress(userAddress));
    let wrappedTokenAddress_ = new ethereum.EventParam("wrappedTokenAddress", ethereum.Value.fromAddress(wrappedTokenAddress));
    let receiverAddress_ = new ethereum.EventParam("receiverAddress", ethereum.Value.fromAddress(receiverAddress));
    let amount_ = new ethereum.EventParam("amount", ethereum.Value.fromI32(amount));

    newEvent.parameters.push(userAddress_);
    newEvent.parameters.push(wrappedTokenAddress_);
    newEvent.parameters.push(receiverAddress_);
    newEvent.parameters.push(amount_);

    return newEvent;
}

export function createNewWithdrawEvent(
    userAddress: Address, 
    amount: i32,
    wrappedTokenAddress: Address 
): Withdraw {
    let newEvent = changetype<Withdraw>(newMockEvent());
    newEvent.parameters = new Array();
    let userAddress_ = new ethereum.EventParam("userAddress", ethereum.Value.fromAddress(userAddress));
    let wrappedTokenAddress_ = new ethereum.EventParam("wrappedTokenAddress", ethereum.Value.fromAddress(wrappedTokenAddress));
    let amount_ = new ethereum.EventParam("amount", ethereum.Value.fromI32(amount));

    newEvent.parameters.push(userAddress_);
    newEvent.parameters.push(amount_);
    newEvent.parameters.push(wrappedTokenAddress_);

    return newEvent;
}