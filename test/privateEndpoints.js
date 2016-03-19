process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var supertest = require("supertest");
var should = require("should");
var prompt = require('prompt');
var config = require("../config.json") [process.env.NODE_ENV];

prompt.start();
// This agent refers to PORT where program is runninng.
var server = supertest.agent("https://"+config.address+":"+config.port);

// UNIT test begin

describe("JWT Secured Endpoints\n+++++++++++++++++++++++++++++++++++",function(){


    var email, password;
    it("Prompt for email and password",function(done){
        prompt.get([
            {name:'email', required: true},
            {name:'password', required: true, hidden: true}
          ], function (err, result) {
          should.not.exist(err, 'err was not null');
          email = result.email;
          password = result.password;
          done();
        });
    });

    this.timeout(4000);
    var jwt, aid;
    it("should return GET /account/token with status 200",function(done){
        var auth = 'Basic ' + new Buffer(email + ':' + password).toString('base64');
        server.get("/account/token")
        .set('Accept-Version', '1.0.0')
        .set('Authorization', auth)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // HTTP status should be 200
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            res.body.should.have.property('jwt');
            jwt = res.body.jwt;
            aid = res.body._id;
            console.log('      | >>>  Your JWT Token:', res.body.jwt.substring(1, 20)+"...");
            // Error key should be false.
            should.not.exist(err, 'err was not null');
            done();
        });
    });

    it("should return GET /mp3s with status 200",function(done){
        server.get("/mp3s?image=false")
        .set('Accept-Version', '1.0.0')
        .set('jwt', jwt)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // HTTP status should be 200
            res.status.should.equal(200);
            res.body.mp3s.should.be.an.instanceOf(Array);
            res.body.mp3s.length.should.be.exactly(10);
            console.log('      | >>>  MP3s array length:', res.body.mp3s.length);
            // Error key should be false.
            should.not.exist(err, 'err was not null');
            done();
        });
    });

    it("should return GET /playlists with status 200",function(done){
        server.get("/playlists")
        .set('Accept-Version', '1.0.0')
        .set('jwt', jwt)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // HTTP status should be 200
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Array);
            console.log('      | >>>  Playlists array length:', res.body.length);
            // Error key should be false.
            should.not.exist(err, 'err was not null');
            done();
        });
    });

    it("should return GET /account with status 200",function(done){
        server.get("/account")
        .set('Accept-Version', '1.0.0')
        .set('jwt', jwt)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // HTTP status should be 200
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            console.log('      | >>>  Email:', res.body.email);
            // Error key should be false.
            should.not.exist(err, 'err was not null');
            done();
        });
    });

    it("should return GET /logs with status 200",function(done){
        server.get("/logs")
        .set('Accept-Version', '1.0.0')
        .set('jwt', jwt)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
            // HTTP status should be 200
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            console.log('      | >>>  Logs array length:', res.body.logs.length);
            // Error key should be false.
            should.not.exist(err, 'err was not null');
            done();
        });
    });

});
