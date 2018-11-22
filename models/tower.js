import { CRUD } from '../libs/sqliteHelper'

class Tower {
  constructor(code, name, address, lat, lng, type) {
    this._code = code
    this._name = name
    this._address = address
    this._lat = lat
    this._lng = lng
    this._type = type
  }
  get code() { return this._code }
  get name() { return this._name }
  get address() { return this._address }
  get lat()  { return this._lat  }
  get lng()  { return this._lng  }
  get type() { return this._type }
}

/**
 * Insert a new tower record into the tower table
 * @param {object} tower 
 * @param {function} callback 
 */
const create = (tower, callback) => {
  const towerType = tower.type ? (`'${tower.type}'`) : null
  const sql = `insert into tower values('${tower.code}', '${tower.name}', ` +
              `'${tower.address}', ${tower.lat}, ${tower.lng}, ${towerType})`
  CRUD.insert(sql, status => callback(status))
}

const towerModel = {
  create: create
}

export { Tower, towerModel }