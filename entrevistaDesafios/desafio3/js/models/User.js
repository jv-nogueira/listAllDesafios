class User{
    constructor(name, email, login, password){
        this._name = name
        this._email = email
        this._login = login
        this._password = password
    }
    getName(){
        return this._name;
    }
    getEmail(){
        return this._email;
    }
    getLogin(){
        return this._login;
    }
    getPassword(){
        return this._password;
    }

}