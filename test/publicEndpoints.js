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
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  Ping:', res.body);
        });
    });

    it("should return GET /license with status 200",function(done){
        server.get("/license")
        .set('Accept-Version', '1.0.0')
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  License:', res.body);
        });
    });

    it("should return GET /mp3s?image=false with status 200",function(done){
        server.get("/mp3s?image=false")
        .set('Accept-Version', '1.0.0')
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

    it("should return GET /mp3s/distinctkey/album with status 200",function(done){
        server.get("/mp3s/distinctkey/album")
        .set('Accept-Version', '1.0.0')
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Array);
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  distinctkey cnt:', res.body.length);
        });
    });

    it("should return GET /mp3s/key/artist?q=Aindra&limit=2&image=false with status 200",function(done){
        server.get("/mp3s/key/artist?q=Aindra&limit=2&image=false")
        .set('Accept-Version', '1.0.0')
        .set('Content-Type', 'application/json')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.should.be.an.instanceOf(Object);
            res.body._totalCnt.should.equal(res.body._remainingCnt + res.body._returnedCnt + res.body._skip);
            should.not.exist(err, 'err was not null');
            done();
            console.log('      | >>>  Aindra cnt:', res.body.length);
        });
    });



    it("should return GET /jingle/random with status 200",function(done){
        server.get("/jingle/random")
        .set('Accept-Version', '1.0.0')
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
    

});
