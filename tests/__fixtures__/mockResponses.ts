export const mockCardReadersResponse = {
  success: true,
  data: [
    { id: 'reader-1', name: 'ACS ACR122U', pinpad: false, card: { atr: '3B9F96801FC78031E073FE211B66D0007777777700D0' } },
    { id: 'reader-2', name: 'Gemalto PC USB-SW', pinpad: true, card: null },
  ],
};

export const mockReadersNoCardResponse = {
  success: true,
  data: [
    { id: 'reader-2', name: 'Gemalto PC USB-SW', pinpad: true, card: null },
  ],
};

export const mockCoreInfoResponse = {
  success: true,
  data: {
    version: '3.7.11',
    activated: true,
    uid: 'abc-123-def-456',
    containers: ['eid-be', 'emv', 'pkcs11'],
    managed: false,
  },
};

export const mockBiographicDataResponse = {
  success: true,
  data: {
    firstNames: ['Jan'],
    lastName: 'De Smedt',
    dateOfBirth: '01 JAN 1980',
    gender: 'M',
    nationality: 'BEL',
    placeOfBirth: 'Gent',
    nobleCondition: '',
    documentType: 1,
    specialStatus: 0,
    duplicata: false,
    specialOrganisation: 0,
  },
};

export const mockAddressResponse = {
  success: true,
  data: {
    streetAndNumber: 'Bondgenotenlaan 1',
    municipality: 'Leuven',
    zipCode: '3000',
  },
};

export const mockRnCertificateResponse = {
  success: true,
  data: { base64: 'MIIEVzCCAj+gAwIBAgIRALXm5BwDLNKdLxxxxxTestxxxx==' },
};

export const mockEmvApplicationDataResponse = {
  success: true,
  data: {
    applicationInterchangeProfile: '5C00',
    applicationLabel: 'VISA CREDIT',
    pan: '4111111111111111',
    panSequenceNumber: '01',
    expirationDate: '2512',
    effectiveDate: '2101',
  },
};

export const mockVerifyPinResponse = {
  success: true,
  data: { verified: true },
};

export function apiError(code: string, description: string) {
  return { success: false, code, description };
}
