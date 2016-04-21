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
          console.log('      | >>>  Email submitted:', result.email);
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
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            res.body.should.have.property('jwt');
            jwt = res.body.jwt;
            aid = res.body._id;
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  Your JWT Token:', res.body.jwt.substring(1, 20)+"...");
        });
    });

    it("should return GET /mp3s?image=false with status 200",function(done){
        server.get("/mp3s?image=false")
        .set('Accept-Version', '1.0.0')
        .set('jwt', jwt)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.mp3s.should.be.an.instanceOf(Array);
            res.body.mp3s.length.should.be.exactly(10);
            res.body._totalCnt.should.equal(res.body._remainingCnt + res.body._returnedCnt + res.body._skip);
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  MP3s array length:', res.body.mp3s.length);
        });
    });

    it("should return GET /jingle/random with status 200",function(done){
        server.get("/jingle/random")
        .set('Accept-Version', '1.0.0')
        .set('jwt', jwt)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            res.body.should.have.property('title');
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  Title:', res.body.title);
        });
    });

    it("should return GET /playlists with status 200",function(done){
        server.get("/playlists")
        .set('Accept-Version', '1.0.0')
        .set('jwt', jwt)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Array);
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  Playlists array length:', res.body.length);
        });
    });

    it("should return GET /mp3s/key/album?q=balaram&operator=contains&sort=title&order=asc with status 200",function(done){
        server.get("/mp3s/key/album?q=balaram&operator=contains&sort=title&order=asc")
        .set('Accept-Version', '1.0.0')
        .set('jwt', jwt)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            res.body._totalCnt.should.equal(res.body._remainingCnt + res.body._returnedCnt + res.body._skip);
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  balaram cnt:', res.body.length);
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
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  Email:', res.body.email);
        });
    });

    it("should return GET /logs with status 200",function(done){
        server.get("/logs")
        .set('Accept-Version', '1.0.0')
        .set('jwt', jwt)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  Logs array length:', res.body.logs.length);
        });
    });

    it("should return GET /mongodb/indexes with status 200 and count of 12",function(done){
        server.get("/mongodb/indexes")
        .set('Accept-Version', '1.0.0')
        .set('jwt', jwt)
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Array);
            res.body.length.should.be.exactly(12);
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  Index array length:', res.body.length);
        });
    });

});
