import {LocalConnection} from '../../../../core/client/Connection';

export class EidBe {
  static CONTAINER_PREFIX = 'beid';
  static RN_DATA = '/rn';
  static ADDRESS = '/address';
  static PHOTO = '/picture';
  static TOKEN = '/token';
  static VERIFY_PRIV_KEY_REF = 'non-repudiation';

  constructor(
    baseUrl: string,
    containerUrl: string,
    connection: LocalConnection,
    reader_id: string
  ) {

  }

}
