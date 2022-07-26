export enum TestType {
  car = '23b71cbd-bcec-ec11-bb3c-6045bd1138c0',
  lorry = 'a586aedb-a9f7-ec11-82e6-0022484289f6'
}

export enum ServiceTypeID {
  standard = '22065eff-4c05-4ca1-8500-afa79c7c4bfa',
  extended = '00bdc279-2cf2-ec11-bb3c-0022484289f6',
  extra_time = '39ca001c-2ef2-ec11-bb3c-0022484289f6',
  extended_extra_time = '32c698e6-31f2-ec11-bb3c-0022484289f6',
  lorry_standard = 'e4cbcf1f-a9f7-ec11-82e6-0022484289f6'
}

export enum TestCentreID {
  barking = '0d439f3a-acf7-ec11-82e6-0022484289f6',
  goodmayes = 'af8b374e-ebf6-ec11-82e6-002248428f64',
  hornchurch = 'dfa600c9-b8ec-ec11-bb3c-6045bd1138c0'
}

export enum SlotStatus {
  open = 1,
  booked = 480600000,
  booked_provisional = 480600003,
  cancelled = 480600004
}


export type BooleanString = 'true' | 'false';