import {assert, createMockedFunction, clearStore, test, newMockEvent, newMockCall, countEntities, mockIpfsFile} from "matchstick-as/assembly/index";
import {Address, BigInt, Bytes, ethereum, store, Value} from "@graphprotocol/graph-ts";
import { log } from "matchstick-as/assembly/log";

import {createNewProjectInfoEvent, createNewCreateVestEvent, createNewTransferWrappedEvent, createNewWithdrawEvent, handleCreateVests, handleTransferWrappers, handleWithdraws, handleProjectInfos} from "./utils";
import {Controller, ProjectInfo, CreateVest, TransferWrapped, Withdraw} from "../generated/Controller/Controller";
import {Project, Derivative, UserHoldings} from "../generated/schema";
import {generateID} from "../src/mapping";

test("Mock ProjectInfo Event : New Event", () => {
    let _id = generateID("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230","0xbc7a2925d5c194d1dbedeb99f13c326851dc8230")
    let newProjectInfo = createNewProjectInfoEvent(
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        "TST",
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        18
    );
    handleProjectInfos([newProjectInfo]);
    assert.fieldEquals("Project",_id, "projectOwnerAddress", "0xbc7a2925d5c194d1dbedeb99f13c326851dc8230");
    assert.fieldEquals("Project",_id, "projectTokenAddress", "0xbc7a2925d5c194d1dbedeb99f13c326851dc8230");
    assert.fieldEquals("Project",_id, "projectTokenTicker", "TST");
    assert.fieldEquals("Project",_id, "projectTokenDecimal", "18");
})

test("Mock ProjectInfo Event : No Update on Existing", () => {
    let _id = generateID("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230","0xbc7a2925d5c194d1dbedeb99f13c326851dc8230")
    let newProjectInfo = createNewProjectInfoEvent(
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        "TSTs",
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        123
    );
    handleProjectInfos([newProjectInfo]);
    assert.fieldEquals("Project",_id, "projectOwnerAddress", "0xbc7a2925d5c194d1dbedeb99f13c326851dc8230");
    assert.fieldEquals("Project",_id, "projectTokenAddress", "0xbc7a2925d5c194d1dbedeb99f13c326851dc8230");
    assert.fieldEquals("Project",_id, "projectTokenTicker", "TST");
    assert.fieldEquals("Project",_id, "projectTokenDecimal", "18");
})

test("Mock Create Vest Event : Transferrable Asset", () => {
    let _id = "0xbc7a2925d5c194d1dbedeb99f13c326851dc8230";
    let _userId = generateID("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230","0xbc7a2925d5c194d1dbedeb99f13c326851dc8230");
    let newProjectInfo = createNewCreateVestEvent(
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        10000,
        100000000,
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        "TST.10MAR20222",
        true
    );
    handleCreateVests([newProjectInfo]);
    assert.fieldEquals("Derivative",_id, "wrappedTokenTicker", "TST.10MAR20222");
    assert.fieldEquals("Derivative",_id, "unlockTime","100000000");
    assert.fieldEquals("Derivative",_id, "totalSupply", "10000");
    assert.fieldEquals("UserHoldings",_userId,"address","0xbc7a2925d5c194d1dbedeb99f13c326851dc8230");
    assert.fieldEquals("UserHoldings",_userId,"tokenAmount","10000");
})


test("Mock Create Vest Event : Transferrable Asset - Increase Total Supply", () => {
    let _id = "0xbc7a2925d5c194d1dbedeb99f13c326851dc8230";
    let _userId = generateID("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230","0xbc7a2925d5c194d1dbedeb99f13c326851dc8230");
    let newProjectInfo = createNewCreateVestEvent(
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        10000,
        100000000,
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        "TST.10MAR20222",
        true
    );
    handleCreateVests([newProjectInfo]);
    assert.fieldEquals("Derivative",_id, "wrappedTokenTicker", "TST.10MAR20222");
    assert.fieldEquals("Derivative",_id, "unlockTime","100000000");
    assert.fieldEquals("Derivative",_id, "totalSupply", "20000");
    assert.fieldEquals("UserHoldings",_userId,"address","0xbc7a2925d5c194d1dbedeb99f13c326851dc8230");
    assert.fieldEquals("UserHoldings",_userId,"tokenAmount","20000");
})

test("Mock Create Vest Event : Non-Transferrable Asset", () => {
    let _id = "0xbc7a2925d5c194d1dbedeb99f14c326851dc8230";
    let _userId = generateID("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230","0xbc7a2925d5c194d1dbedeb99f14c326851dc8230");
    let newProjectInfo = createNewCreateVestEvent(
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        10000,
        100000000,
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f14c326851dc8230"),
        "TST.10MAR20222-NT",
        false
    );
    handleCreateVests([newProjectInfo]);
    assert.fieldEquals("Derivative",_id, "wrappedTokenTicker", "TST.10MAR20222-NT");
    assert.fieldEquals("Derivative",_id, "unlockTime","100000000");
    assert.fieldEquals("Derivative",_id, "totalSupply", "10000");
    assert.fieldEquals("UserHoldings",_userId,"address","0xbc7a2925d5c194d1dbedeb99f13c326851dc8230");
    assert.fieldEquals("UserHoldings",_userId,"tokenAmount","10000");
})


test("Mock Create Vest Event : Non-Transferrable Asset - Increase Total Supply", () => {
    let _id = "0xbc7a2925d5c194d1dbedeb99f14c326851dc8230";
    let _userId = generateID("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230","0xbc7a2925d5c194d1dbedeb99f14c326851dc8230");
    let newProjectInfo = createNewCreateVestEvent(
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f13c326851dc8230"),
        10000,
        100000000,
        Address.fromString("0xbc7a2925d5c194d1dbedeb99f14c326851dc8230"),
        "TST.10MAR20222-NT",
        false
    );
    handleCreateVests([newProjectInfo]);
    assert.fieldEquals("Derivative",_id, "wrappedTokenTicker", "TST.10MAR20222-NT");
    assert.fieldEquals("Derivative",_id, "unlockTime","100000000");
    assert.fieldEquals("Derivative",_id, "totalSupply", "20000");
    assert.fieldEquals("UserHoldings",_userId,"address","0xbc7a2925d5c194d1dbedeb99f13c326851dc8230");
    assert.fieldEquals("UserHoldings",_userId,"tokenAmount","20000");
})