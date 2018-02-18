/**
 * Represent a entity in LeaderBoard
 */
export default class Player {
  constructor(nik, name, nationality, photo, score) {
    this._nik = nik;
    this._name = name;
    this._nationality = nationality;
    this._photo = photo;
    this._score = score;
  }

  toObject() {
    return {
      nik: this._nik,
      name: this._name,
      nationality: this._nationality,
      photo: this._photo,
      score: this._score
    }
  }

  getNik() {
    return this._nik.toString();
  }
}
