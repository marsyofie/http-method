var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./app.js');
var should = chai.should();
var payload = require('./payload.json');
var payloadEdit = require('./payload-edit.json');
chai.use(chaiHttp);


describe('Package Controller', function() {
	let ID;

	it('Post', function(done) {
		this.timeout(50000);

		chai.request(server)
			.post('/package/')
			.send(payload)
			.end(function(err, res) {
				res.status.should.be.equal(200);
				res.should.be.json;
				res.body.code.should.equal('00');
				done();
			});

	});

	it('Get All', function(done) {
		this.timeout(50000);

		chai.request(server)
			.get('/package/')
			.end(function(err, res) {
				res.status.should.be.equal(200);
				res.should.be.json;
				res.body.code.should.equal('00');
				// res.body.data.should.to.have.property('_id')
				
				if (Array.isArray(res.body.data)) {
					ID = res.body.data[0]._id;
				} else {
					ID = res.body.data._id;
				}

				done();
			});

	});

	it('Get Valid ID', function(done) {
		this.timeout(50000);

		chai.request(server)
			.get('/package/' + ID)
			.end(function(err, res) {
				res.status.should.be.equal(200);
				res.should.be.json;
				res.body.code.should.equal('00');
				done();
			});

	});

	it('Get Unknown ID', function(done) {
		this.timeout(50000);

		chai.request(server)
			.get('/package/5f71ad197464dd17d4c538ab')
			.end(function(err, res) {
				res.status.should.be.equal(404);
				res.should.be.json;
				res.body.code.should.equal('06');
				done();
			});

	});

	it('Put Send 1 Field', function(done) {
		this.timeout(50000);

		chai.request(server)
			.put('/package/' + ID)
			.send({ customer_name: "Gabymars Yofie" })
			.end(function(err, res) {
				res.status.should.be.equal(400);
				res.should.be.json;
				res.body.code.should.equal('05');
				done();
			});

	});

	it('Put', function(done) {
		this.timeout(50000);

		chai.request(server)
			.put('/package/' + ID)
			.send(payloadEdit)
			.end(function(err, res) {
				res.status.should.be.equal(200);
				res.should.be.json;
				res.body.code.should.equal('00');
				done();
			});

	});

	it('Patch', function(done) {
		this.timeout(50000);

		chai.request(server)
			.patch('/package/' + ID)
			.send({ customer_name: "Gabymars Yofie" })
			.end(function(err, res) {
				res.status.should.be.equal(200);
				res.should.be.json;
				res.body.code.should.equal('00');
				done();
			});

	});

	it('Delete Valid ID', function(done) {
		this.timeout(50000);

		chai.request(server)
			.delete('/package/' + ID)
			.end(function(err, res) {
				res.status.should.be.equal(200);
				res.should.be.json;
				res.body.code.should.equal('00');
				done();
			});

	});

	it('Delete Unknown ID', function(done) {
		this.timeout(50000);

		chai.request(server)
			.delete('/package/5f71ad197464dd17d4c538ab')
			.end(function(err, res) {
				res.status.should.be.equal(404);
				res.should.be.json;
				res.body.code.should.equal('06');
				done();
			});

	});
});