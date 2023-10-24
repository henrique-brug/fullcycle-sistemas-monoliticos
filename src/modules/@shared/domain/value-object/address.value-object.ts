import ValueObject from "./value-object.interface";

type AddressProps = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export default class Address implements ValueObject {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;
  
    constructor(props: AddressProps) {
        this._street = props.street;
        this._number = props.number;
        this._complement = props.complement;
        this._city = props.city;
        this._state = props.state;
        this._zipCode = props.zipCode;
    }
  
    public get street(): string {
        return this._street;
      }
      
    public set street(newStreet: string) {
        this._street = newStreet;
    }
    
    public get number(): string {
        return this._number;
    }
    
    public set number(newNumber: string) {
        this._number = newNumber;
    }
    
    public get complement(): string {
        return this._complement;
    }
    
    public set complement(newComplement: string) {
        this._complement = newComplement;
    }
    
    public get city(): string {
        return this._city;
    }
    
    public set city(newCity: string) {
        this._city = newCity;
    }
    
    public get state(): string {
        return this._state;
    }
    
    public set state(newState: string) {
        this._state = newState;
    }
    
    public get zipCode(): string {
        return this._zipCode;
    }
    
    public set zipCode(newZipCode: string) {
        this._zipCode = newZipCode;
    }
}