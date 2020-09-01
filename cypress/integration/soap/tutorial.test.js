var convert = require('xml-js');

function returnObject(response) {
    let responseObj = JSON.parse(convert.xml2json(response.body, {compact: true, spaces: 4, ignoreDeclaration: true, ignoreAttributes: true}));
    return responseObj["soap:Envelope"]["soap:Body"];
}
context('SOAP TEST', () => {
    it('Deneme', () => {
        cy.readFile('cypress/fixtures/payload.xml').then((data) => {
            cy.request({
                method: 'POST',
                url: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL',
                headers: {
                    'content-type': 'text/xml'
                },
                body: data
            }).then((response) => {
                expect(response.status).to.be.eq(200);
                let responseObj = JSON.parse(convert.xml2json(response.body, {compact: true, spaces: 4, ignoreDeclaration: true, ignoreAttributes: true}));
                console.log(responseObj["soap:Envelope"]["soap:Body"]["m:CapitalCityResponse"]["m:CapitalCityResult"]["_text"])
            });
        });
    });
    it('Deneme2', () => {
        cy.readFile('cypress/fixtures/payload1.xml').then((data) => {
            cy.request({
                method: 'POST',
                url: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL',
                headers: {
                    'content-type': 'text/xml'
                },
                body: data
            }).then((response) => {
                expect(response.status).to.be.eq(200);
                let responseObj = returnObject(response);
                console.log(responseObj["m:CountryNameResponse"]["m:CountryNameResult"]["_text"])
            });
        });
    });
});