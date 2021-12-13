import path from 'path'

describe('Binary File Read', () => {
  it('should intercept the binary file correctly', () => {
    cy.intercept('/some-binary.file', { fixture: 'some-binary.file', encoding: 'binary' })

    cy.visit('http://localhost:3000')
    cy.findByText('Some file').click()

    const downloadsFolder = Cypress.config("downloadsFolder");

    cy.fixture('some-binary.file').then((binary) => {
      cy.readFile(path.join(downloadsFolder, "some-binary.file")).then((file) => {
        // This assertion checks but using diff (terminal) the files are not the same. 
        expect(file).to.equal(binary)
      })
    })
  })
})