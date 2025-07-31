import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PostProvider{
   // server: string = 'http://localhost/api1/';
    server: string = 'http://windis.si2022.com/';

    constructor(public httpP:HttpClient) {}
    postData(body: any, file: string): Observable<any> {
        let type = 'application/json; charset=utf-8';
        let headers = new HttpHeaders ({ 'Content-Type': type});

        return this.httpP.post(this.server + file, JSON.stringify(body), {
            headers: headers,
        }).pipe(
            map((res: any) => {
                return res;
            })
        );
    }
}