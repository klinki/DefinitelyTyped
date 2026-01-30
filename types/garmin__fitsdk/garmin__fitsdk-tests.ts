// Type definitions for @garmin/fitsdk tests
// Project: https://github.com/garmin/fit-javascript-sdk

import {
    Decoder,
    Encoder,
    Stream,
    CrcCalculator,
    Profile,
    Utils,
    DecoderReadOptions,
    DecoderReadResult,
    EncoderOptions,
    FieldDescription,
    Mesg,
    FileIdMesg,
    FileCreatorMesg,
    ActivityMesg,
    SessionMesg,
    RecordMesg,
    EventMesg,
    DeviceInfoMesg,
    UserProfileMesg,
    SetMesg,
    TimeInZoneMesg,
    SportMesg,
    TrainingSettingsMesg,
    ZonesTargetMesg,
    DeviceSettingsMesg,
    TimestampCorrelationMesg,
} from "@garmin/fitsdk";

// ============================================================================
// Stream Tests
// ============================================================================

// Test Stream static constants
const littleEndian: boolean = Stream.LITTLE_ENDIAN;
const bigEndian: boolean = Stream.BIG_ENDIAN;

// Test Stream constructor
const arrayBuffer = new ArrayBuffer(100);
const stream = new Stream(arrayBuffer);

// Test Stream static factory methods
const streamFromByteArray = Stream.fromByteArray([1, 2, 3, 4, 5]);
const streamFromArrayBuffer = Stream.fromArrayBuffer(new ArrayBuffer(50));
// Stream.fromBuffer(buffer) - requires Buffer from Node.js types

// Test Stream readonly properties
const length: number = stream.length;
const bytesRead: number = stream.bytesRead;
const position: number = stream.position;

// Test Stream crcCalculator getter/setter
const crcCalc: CrcCalculator | null = stream.crcCalculator;
stream.crcCalculator = new CrcCalculator();

// Test Stream instance methods
stream.reset();
stream.seek(10);
const sliced: ArrayBuffer = stream.slice(0, 50);
const peekedByte: number = stream.peekByte();
const readByte: number = stream.readByte();
const readBytes: Uint8Array = stream.readBytes(10);

// ============================================================================
// Decoder Tests
// ============================================================================

// Test Decoder constructor
const decoder = new Decoder(stream);

// Test Decoder static method
const isFitStatic: boolean = Decoder.isFIT(stream);

// Test Decoder instance methods
const isFit: boolean = decoder.isFIT();
const integrity: boolean = decoder.checkIntegrity();

// Test Decoder read without options
const result: DecoderReadResult = decoder.read();

// Test Decoder read with minimal options
const resultWithOptions: DecoderReadResult = decoder.read({
    expandSubFields: true,
    expandComponents: false,
    applyScaleAndOffset: true,
});

// Test Decoder read with all options
const resultWithAllOptions: DecoderReadResult = decoder.read({
    mesgListener: (mesgNum, message) => {
        const num: number = mesgNum;
        const msg: any = message;
    },
    mesgDefinitionListener: (messageDefinition) => {
        const def: any = messageDefinition;
    },
    fieldDescriptionListener: (key, developerDataIdMesg, fieldDescriptionMesg) => {
        const k: number = key;
        const devId: any = developerDataIdMesg;
        const fieldDesc: any = fieldDescriptionMesg;
    },
    expandSubFields: true,
    expandComponents: true,
    applyScaleAndOffset: true,
    convertTypesToStrings: true,
    convertDateTimesToDates: true,
    includeUnknownData: false,
    mergeHeartRates: true,
    decodeMemoGlobs: false,
    skipHeader: false,
    dataOnly: false,
});

// ============================================================================
// DecoderReadResult Tests
// ============================================================================

const messages = result.messages;
const errors: Error[] = result.errors;
const profileVersion = result.profileVersion;

// ============================================================================
// Message Type Tests
// ============================================================================

// Test FileIdMesg
const fileIdMesg: FileIdMesg = {
    serialNumber: 1234567890,
    timeCreated: new Date(),
    manufacturer: "garmin",
    product: 1234,
    type: "activity",
    garminProduct: "fenix",
    customField: "custom value",
};

// Test FileCreatorMesg
const fileCreatorMesg: FileCreatorMesg = {
    softwareVersion: 1234,
    hardwareVersion: 5678,
};

// Test ActivityMesg
const activityMesg: ActivityMesg = {
    timestamp: new Date(),
    totalTimerTime: 3600,
    localTimestamp: 1234567890,
    numSessions: 1,
    type: "manual",
    event: "activity",
    eventType: "start",
};

// Test SessionMesg
const sessionMesg: SessionMesg = {
    timestamp: new Date(),
    startTime: new Date(),
    totalElapsedTime: 3600,
    totalTimerTime: 3600,
    totalDistance: 10000,
    totalCycles: 1000,
    sport: "running",
    subSport: "trail",
    avgHeartRate: 150,
    maxHeartRate: 180,
};

// Test RecordMesg
const recordMesg: RecordMesg = {
    timestamp: new Date(),
    distance: 1000,
    heartRate: 150,
    altitude: 100,
    speed: 3.5,
    power: 250,
    cadence: 80,
};

// Test EventMesg
const eventMesg: EventMesg = {
    timestamp: new Date(),
    data: 12345,
    event: "timer",
    eventType: "start",
    eventGroup: 0,
};

// Test DeviceInfoMesg
const deviceInfoMesg: DeviceInfoMesg = {
    timestamp: new Date(),
    serialNumber: 1234567890,
    manufacturer: "garmin",
    product: 1234,
    softwareVersion: 1234,
    batteryStatus: "good",
};

// Test UserProfileMesg
const userProfileMesg: UserProfileMesg = {
    weight: 70,
    gender: "male",
    height: 180,
    restingHeartRate: 60,
    activityClass: 5,
};

// Test SetMesg (strength training)
const setMesg: SetMesg = {
    timestamp: new Date(),
    duration: 60,
    startTime: new Date(),
    repetitions: 10,
    weight: 50,
    setType: "active",
};

// Test TimeInZoneMesg
const timeInZoneMesg: TimeInZoneMesg = {
    timestamp: new Date(),
    timeInHrZone: [300, 600, 900],
    referenceMesg: "session",
    hrCalcType: "percentMaxHr",
    maxHeartRate: 190,
};

// Test SportMesg
const sportMesg: SportMesg = {
    name: "Running",
    sport: "running",
    subSport: "trail",
};

// Test TrainingSettingsMesg
const trainingSettingsMesg: TrainingSettingsMesg = {
    targetDistance: 10000,
    targetTime: 3600,
};

// Test ZonesTargetMesg
const zonesTargetMesg: ZonesTargetMesg = {
    maxHeartRate: 190,
    thresholdHeartRate: 170,
    functionalThresholdPower: 250,
};

// Test DeviceSettingsMesg
const deviceSettingsMesg: DeviceSettingsMesg = {
    activeTimeZone: 0,
    utcOffset: 0,
    timeMode: ["manual"],
    activityTrackerEnabled: true,
};

// Test TimestampCorrelationMesg
const timestampCorrelationMesg: TimestampCorrelationMesg = {
    timestamp: new Date(),
    systemTimestamp: new Date(),
    localTimestamp: 1234567890,
};

// Test accessing typed messages from DecoderReadResult
const fileIdMesgs: FileIdMesg[] | undefined = messages.fileIdMesgs;
const fileCreatorMesgs: FileCreatorMesg[] | undefined = messages.fileCreatorMesgs;
const activityMesgs: ActivityMesg[] | undefined = messages.activityMesgs;
const sessionMesgs: SessionMesg[] | undefined = messages.sessionMesgs;
const recordMesgs: RecordMesg[] | undefined = messages.recordMesgs;
const eventMesgs: EventMesg[] | undefined = messages.eventMesgs;
const deviceInfoMesgs: DeviceInfoMesg[] | undefined = messages.deviceInfoMesgs;
const userProfileMesgs: UserProfileMesg[] | undefined = messages.userProfileMesgs;
const setMesgs: SetMesg[] | undefined = messages.setMesgs;
const timeInZoneMesgs: TimeInZoneMesg[] | undefined = messages.timeInZoneMesgs;
const sportMesgs: SportMesg[] | undefined = messages.sportMesgs;
const trainingSettingsMesgs: TrainingSettingsMesg[] | undefined = messages.trainingSettingsMesgs;
const zonesTargetMesgs: ZonesTargetMesg[] | undefined = messages.zonesTargetMesgs;
const deviceSettingsMesgs: DeviceSettingsMesg[] | undefined = messages.deviceSettingsMesgs;
const timestampCorrelationMesgs: TimestampCorrelationMesg[] | undefined = messages.timestampCorrelationMesgs;

// Test accessing dynamic/custom message types
const customMesgs = messages.customMessageType;

// ============================================================================
// Encoder Tests
// ============================================================================

// Test Encoder with no options
const encoder = new Encoder();

// Test Encoder with fieldDescriptions
const encoderWithFields = new Encoder({
    fieldDescriptions: {
        0: {
            developerDataIdMesg: { developerId: 123 },
            fieldDescriptionMesg: { fieldName: "custom_field" },
        },
    },
});

// Test writeMesg
const mesg: Mesg = {
    mesgNum: 0,
    timestamp: new Date(),
    serialNumber: 12345,
};
encoder.writeMesg(mesg);

// Test onMesg (can be used as mesgListener callback)
encoder.onMesg(0, { timestamp: new Date() });

// Test addDeveloperField method
encoder.addDeveloperField(1, { developerId: 456 }, { fieldName: "another_field" });

// Test close method
const encodedData: Uint8Array = encoder.close();

// ============================================================================
// CrcCalculator Tests
// ============================================================================

const crcCalculator = new CrcCalculator();

// Test crc getter
const currentCrc: number = crcCalculator.crc;

// Test addBytes method
const newCrc: number = crcCalculator.addBytes(new Uint8Array([1, 2, 3, 4, 5]), 0, 5);

// Test static calculateCRC method
const calculatedCrc: number = CrcCalculator.calculateCRC(new Uint8Array([1, 2, 3]), 0, 3);

// ============================================================================
// Profile Tests
// ============================================================================

// Test version object
const major: number = Profile.version.major;
const minor: number = Profile.version.minor;
const patch: number = Profile.version.patch;
const versionType: string = Profile.version.type;

// Test CommonFields
const partIndex: number = Profile.CommonFields.PartIndex;
const timestampField: number = Profile.CommonFields.Timestamp;
const messageIndex: number = Profile.CommonFields.MessageIndex;

// Test MesgNum enum-like object
const mesgNumKeys: string[] = Object.keys(Profile.MesgNum);
const fileIdMesgNum: number = Profile.MesgNum.FILE_ID;
const recordMesgNum: number = Profile.MesgNum.RECORD;

// Test messages profile
const messageProfile = Profile.messages[0];
const messageNum: number = messageProfile.num;
const messageName: string = messageProfile.name;
const messagesKey: string = messageProfile.messagesKey;
const fields = messageProfile.fields;

// Test types profile
const typeProfile = Profile.types[0];
const typeValue: string | number = typeProfile[0];

// Test dynamic profile access
const dynamicProfile = Profile.SOME_DYNAMIC_PROPERTY;

// ============================================================================
// Utils Tests
// ============================================================================

// Test FIT_EPOCH_MS constant
const fitEpoch: number = Utils.FIT_EPOCH_MS;

// Test date conversion functions
const date: Date = Utils.convertDateTimeToDate(1234567890);
const dateTime: number = Utils.convertDateToDateTime(new Date());

// Test utility objects
const fitBaseType = Utils.FitBaseType;
const baseTypeToFieldType = Utils.BaseTypeToFieldType;
const fieldTypeToBaseType = Utils.FieldTypeToBaseType;

// ============================================================================
// Type Tests (ensuring types can be used as type annotations)
// ============================================================================

const options: DecoderReadOptions = {
    expandSubFields: true,
};

const readResult: DecoderReadResult = decoder.read(options);

// Export to test module usage
export {
    stream,
    decoder,
    encoder,
    encoderWithFields,
    result,
    fileIdMesg,
    sessionMesg,
    recordMesg,
    encodedData,
    crcCalculator,
};
