process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var supertest = require("supertest");
var should = require("should");
var config = require("../config.json") [process.env.NODE_ENV];

// This agent refers to PORT where program is runninng.
var server = supertest.agent("https://"+config.address+":"+config.port);

// UNIT test begin
describe("Public GET Endpoints\n+++++++++++++++++++++++++++++++++++",function(){

    this.timeout(4000);
    it("should return GET /ping with status 200",function(done){
        server.get("/ping")
        .set('Accept-Version', '1.0.0')
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // HTTP status should be 200
            res.status.should.equal(200);
            // Error key should be false.
            should.not.exist(err, 'err was not null');
            done();
        });
    });

    it("should return GET /license with status 200",function(done){
        server.get("/license")
        .set('Accept-Version', '1.0.0')
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // HTTP status should be 200
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            // Error key should be false.
            should.not.exist(err, 'err was not null');
            done();
        });
    });
});
