
export class TokenData {

    access_token : string;
    token_type : string;
    expires_in : number;
    scope : string;

    constructor(acc : string, tok : string, expir : number, sco : string){
        this.access_token = acc;
        this.token_type = tok;
        this.expires_in = expir;
        this.scope = sco;
    }
}