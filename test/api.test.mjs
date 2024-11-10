import supertest from 'supertest';
import { expect } from 'chai';
import addContext from 'mochawesome/addContext.js';
import util from 'util';
const request = supertest("http://localhost:3000");
let response;

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6eyJfaWQiOiI2NzJhMGU3MDcyN2JiMTQwMmUwMDQwZTUiLCJuYW1lIjoiRGl2eWEgQWdyYXdhbCIsIm93bmVySGFuZGxlIjoiRGl2eWEgQWdyYXdhbFVXU2kiLCJET0IiOiIyNi0wMS0yMDA0IiwicGhvbmUiOjgyNzM4MDEzNDYsImVtYWlsIjoiaW10XzIwMjIwMzhAaWlpdG0uYWMuaW4iLCJwYXNzd29yZCI6IiQyYiQxMCRaQ3pQL2ZxMHFkMVFsWm5QQThLYlFPa2NaVHc2L2Uxb3JmSXFweWMyQXNLOU9XU3Y5Y3NacSIsIl9fdiI6MH0sImlhdCI6MTczMTI2ODM4MywiZXhwIjoxNzMxMjc5MTgzfQ.io2dgcbYbCu-CSnr3C48BTJYVd7ov1o2CV9gVplMbNA";

const playerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXIiOnsiX2lkIjoiNjcyYTFhY2UwYjVmMWE3ZTI1MzNhYmY5IiwibmFtZSI6IkRpdnlhIEFncmF3YWwiLCJ1c2VyaGFuZGxlIjoiRGl2eWFIZlBvIiwiYm9va2luZ3MiOlsiNjcyYTFlMDFmOGFjODQxZWExMjhjN2JmIiwiNjcyYTFlMDFmOGFjODQxZWExMjhjN2JmIiwiNjcyYTFlMDFmOGFjODQxZWExMjhjN2JmIiwiNjcyYTFlMDFmOGFjODQxZWExMjhjN2JmIiwiNjcyYTFlMDFmOGFjODQxZWExMjhjN2JmIiwiNjcyYTFlMDFmOGFjODQxZWExMjhjN2JmIiwiNjcyZmEwZTc2OTIxYjg5YWE1ZDkwZTYyIiwiNjcyZmEwZTc2OTIxYjg5YWE1ZDkwZTYyIiwiNjcyZmExZmY2OTIxYjg5YWE1ZDkwZWJjIiwiNjcyYTFlMDFmOGFjODQxZWExMjhjN2JmIiwiNjcyZmEwZTc2OTIxYjg5YWE1ZDkwZTYyIiwiNjcyZmEwZTc2OTIxYjg5YWE1ZDkwZTYyIiwiNjcyYTFlMDFmOGFjODQxZWExMjhjN2JmIiwiNjcyYTFlMDFmOGFjODQxZWExMjhjN2JmIiwiNjcyZmExZmY2OTIxYjg5YWE1ZDkwZWJjIiwiNjcyZmExZmY2OTIxYjg5YWE1ZDkwZWJjIiwiNjcyZmQ1ZjYxMmJhYjczNzA2Y2UyOTA1IiwiNjcyZmExMTM2OTIxYjg5YWE1ZDkwZTc2IiwiNjczMDcwNDc1ZWRkMGE4MTFkMmE1YjEzIiwiNjczMDgwMmRhMTI0NmI1Y2I4NDFlMjVhIiwiNjczMGM2ZTFmMmM3MWY2ZTQzNTAzNWU0IiwiNjczMGMyYmRmMmM3MWY2ZTQzNTAzNTQ1Il0sIkRPQiI6IjI2LTAxLTIwMDQiLCJwaG9uZSI6ODI3MzgwMTM0NiwiZW1haWwiOiJkaXZ5YWFncmF3YWwwNzQ3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEE2em9jL2VYYVROSGlySEIxaWRIUmVCdjhLT0UycnpnS29TQXFYYXpIaFZNZWouQmZmNUhxIiwiX192IjoyMn0sImlhdCI6MTczMTI2OTA5OSwiZXhwIjoxNzMxMjc5ODk5fQ.A9ecqCiSXsIZ_UK7QQvY4GsGiWaEf48ORJ715_eJPSw";

describe('Health', () => {
    it('should return a 200 response on GET /health', async() => {
        response = await request
            .get('/health')
            .then(response => {
                return response;
        });

        expect(response.statusCode).to.be.equal(200);
    });
});

describe('Playground', () => {
    it('should return a 200 response on GET /playground/all', async() => {
        response = await request
            .get('/playground/all')
            .query({"page":1})
            .then(response => {
                return response;
        });

        expect(response.statusCode).to.be.equal(200);
        expect((response.body).result).to.be.an('array');
    });

    it('should return a 200 response on GET /playground/detail', async() => {
        response = await request
            .get('/playground/detail')
            .query({"id":"6730fa48c3f193c7d239f452"})
            .then(response => {
                return response;
        });

        expect(response.statusCode).to.be.equal(200);
        expect((response.body).result).to.be.an('object');
    });

    it('should return a 200 response on GET /playground/owner', async() => {
        response = await request
            .get('/playground/owner')
            .query({"id":"672a0e70727bb1402e0040e5"})
            .then(response => {
                return response;
        });

        expect(response.statusCode).to.be.equal(200);
        expect((response.body).result).to.be.an('array');
    });

    it('should return a 200 response on GET /playground/search', async() => {
        response = await request
            .get('/playground/search')
            .query({"keyword":"Gwalior"})
            .then(response => {
                return response;
        });

        expect(response.statusCode).to.be.equal(200);
        expect(response.body).to.be.an('array');
    });

    it('should return a 201 response on POST /playground/new', async() => {
        
        response = await request
            .post('/playground/new')
            .set("Authorization",`Bearer ${token}`)
            .send({
                    "name":"Football Ground",
                    "location":"Woxen University",
                    "timings":"11:00 - 18:00",
                    "sports":"Football",
                    "price":"1500",
                    "type":"Outdoor",
                    "imgUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPqfhyUwg25Ve4S58tPI5UDbvkOgf_AT2KNCLVdTYBWUek-D6euViXmsB0aG6EUHUk9zs&usqp=CAU"
                })
            .then(response => {
                return response;
        });

        expect(response.statusCode).to.be.equal(201);
        expect(response.body).to.be.an('object');
    });

    it('should return a 200 response on POST /playground/delete', async() => {

        response = await request
            .delete('/playground/delete')
            .query({"id":"6730f993c3f193c7d239f404"})
            .set("Authorization",`Bearer ${token}`)
            .send({
                    "name":"Football Ground",
                    "location":"Woxen University",
                    "timings":"11:00 - 18:00",
                    "sports":"Football",
                    "price":"1500",
                    "type":"Outdoor",
                    "imgUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPqfhyUwg25Ve4S58tPI5UDbvkOgf_AT2KNCLVdTYBWUek-D6euViXmsB0aG6EUHUk9zs&usqp=CAU"
                })
            .then(response => {
                return response;
        });

        expect(response.statusCode).to.be.equal(200);
        expect(response.body).to.have.property('message');
    });

    it('should return a 200 response on POST /playground/update', async() => {
        
        response = await request
            .put('/playground/update')
            .query({"id":"6730fa48c3f193c7d239f452"})
            .set("Authorization",`Bearer ${token}`)
            .send({
                    "name":"Sports Complex",
                    })
            .then(response => {
                return response;
        });

        expect(response.statusCode).to.be.equal(200);
    });
});

describe('Owner', () => {
    it('should return a 200 response on POST /login', async () => {
              
        const email = "imt_2022038@iiitm.ac.in";
        const password = "0000";
    
        response = await request
            .post('/owner/login')
            .send({ email, password });
    
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property("token");
    });

    it('should return a 201 response on POST /register', async () => {
              
        const email = "imt_2022038@iiitm.ac.in";
        const password = "0000";
    
        response = await request
            .post('/owner/register')
            .send({ email, password });
    
        expect(response.statusCode).to.equal(200);
    });

    it('should return a 200 response on GET /profile', async () => {
   
        response = await request
            .get('/owner/profile')
            .set("Authorization", `Bearer ${token}`);
    
        expect(response.statusCode).to.equal(200);
    });
});

describe('Player', () => {
    it('should return a 200 response on POST /login', async () => {
              
        const email = "divyaagrawal0747@gmail.com";
        const password = "0000";
    
        response = await request
            .post('/player/login')
            .send({ email, password });
    
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property("token");
    });

    it('should return a 200 response on POST /register', async () => {
              
        const email = "divyaagrawal0747@gmail.com";
        const password = "0000";
    
        response = await request
            .post('/player/register')
            .send({ email, password });
    
        expect(response.statusCode).to.equal(200);
    });

    it('should return a 200 response on GET /profile', async () => {
    
        response = await request
            .get('/player/profile')
            .set("Authorization", `Bearer ${playerToken}`)
    
        expect(response.statusCode).to.equal(200);
    });

    it('should return a 200 response on PUT /book', async () => {
    
        response = await request
            .put('/player/book')
            .query({slotId: "673070475edd0a811d2a5b13"})
            .set("Authorization", `Bearer ${playerToken}`)
    
        expect(response.statusCode).to.equal(200);
    });

    it('should return a 200 response on GET /bookings', async () => {
    
        response = await request
            .get('/player/bookings')
            .set("Authorization", `Bearer ${playerToken}`)
    
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.an("array");
    });
});

describe('Slot', () => {
    it('should return a 200 response on GET /all', async () => {            
    
        response = await request
            .get('/slot/all')
            .query({playgroundId: "6730fa48c3f193c7d239f452"})
    
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property("slots");
    });

    it('should return a 200 response on GET /details', async () => {            
    
        response = await request
            .get('/slot/details')
            .query({slotId: "672fd5f612bab73706ce2905"})
    
        expect(response.statusCode).to.equal(200);
    });

    it('should return a 201 response on POST /new', async () => {            
    
        const time = "20:00  21:00";
        const date = "12-11-2024";
        const slotSize = "22";

        response = await request
            .post('/slot/new')
            .send({time, date, slotSize})
            .query({playgroundId: "6730fa48c3f193c7d239f452"})
            .set("Authorization", `Bearer ${token}`)
    
        expect(response.statusCode).to.equal(201);
    });    
});

afterEach(function() {
    addContext(this, {
        title: 'Response Body',
        value: util.inspect(response.body)
    });
});