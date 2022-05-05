// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Project extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("projectOwnerAddress", Value.fromBytes(Bytes.empty()));
    this.set("projectTokenAddress", Value.fromBytes(Bytes.empty()));
    this.set("projectTokenTicker", Value.fromString(""));
    this.set("projectTokenDecimal", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Project entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Project must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Project", id.toString(), this);
    }
  }

  static load(id: string): Project | null {
    return changetype<Project | null>(store.get("Project", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get projectOwnerAddress(): Bytes {
    let value = this.get("projectOwnerAddress");
    return value!.toBytes();
  }

  set projectOwnerAddress(value: Bytes) {
    this.set("projectOwnerAddress", Value.fromBytes(value));
  }

  get projectTokenAddress(): Bytes {
    let value = this.get("projectTokenAddress");
    return value!.toBytes();
  }

  set projectTokenAddress(value: Bytes) {
    this.set("projectTokenAddress", Value.fromBytes(value));
  }

  get projectTokenTicker(): string {
    let value = this.get("projectTokenTicker");
    return value!.toString();
  }

  set projectTokenTicker(value: string) {
    this.set("projectTokenTicker", Value.fromString(value));
  }

  get projectTokenDecimal(): BigInt {
    let value = this.get("projectTokenDecimal");
    return value!.toBigInt();
  }

  set projectTokenDecimal(value: BigInt) {
    this.set("projectTokenDecimal", Value.fromBigInt(value));
  }

  get derivatives(): Array<string> {
    let value = this.get("derivatives");
    return value!.toStringArray();
  }

  set derivatives(value: Array<string>) {
    this.set("derivatives", Value.fromStringArray(value));
  }
}

export class Derivative extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("wrappedTokenTicker", Value.fromString(""));
    this.set("unlockTime", Value.fromBigInt(BigInt.zero()));
    this.set("totalSupply", Value.fromBigInt(BigInt.zero()));
    this.set("projectID", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Derivative entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Derivative must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Derivative", id.toString(), this);
    }
  }

  static load(id: string): Derivative | null {
    return changetype<Derivative | null>(store.get("Derivative", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get wrappedTokenTicker(): string {
    let value = this.get("wrappedTokenTicker");
    return value!.toString();
  }

  set wrappedTokenTicker(value: string) {
    this.set("wrappedTokenTicker", Value.fromString(value));
  }

  get unlockTime(): BigInt {
    let value = this.get("unlockTime");
    return value!.toBigInt();
  }

  set unlockTime(value: BigInt) {
    this.set("unlockTime", Value.fromBigInt(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get holders(): Array<string> {
    let value = this.get("holders");
    return value!.toStringArray();
  }

  set holders(value: Array<string>) {
    this.set("holders", Value.fromStringArray(value));
  }

  get projectID(): string {
    let value = this.get("projectID");
    return value!.toString();
  }

  set projectID(value: string) {
    this.set("projectID", Value.fromString(value));
  }
}

export class UserHoldings extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("tokenAmount", Value.fromBigInt(BigInt.zero()));
    this.set("derivativeID", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UserHoldings entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UserHoldings must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UserHoldings", id.toString(), this);
    }
  }

  static load(id: string): UserHoldings | null {
    return changetype<UserHoldings | null>(store.get("UserHoldings", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get tokenAmount(): BigInt {
    let value = this.get("tokenAmount");
    return value!.toBigInt();
  }

  set tokenAmount(value: BigInt) {
    this.set("tokenAmount", Value.fromBigInt(value));
  }

  get derivativeID(): string {
    let value = this.get("derivativeID");
    return value!.toString();
  }

  set derivativeID(value: string) {
    this.set("derivativeID", Value.fromString(value));
  }
}
