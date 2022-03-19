/// <reference types="cypress" />
const dayjs = require("dayjs")

describe("ทดสอบการทำงานของการเลือกวันที่จองเตียง", () => {
  it("ทำการ Login และเข้าสู่หน้าจองเตียง เพื่อทดสอบการเลือกวันที่ ในกรณีที่วันที่ที่เลือก เป็นวันในอดีต", () => {
    cy.visit("/login")
    cy.get('[type="email"]')
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com")
    cy.get('[type="password"]')
      .type("Passw0rd")
      .should("have.value", "Passw0rd")
    cy.get(".btn").click()
    cy.url().should("include", "/")
    cy.wait(5000)
    cy.get(":nth-child(1) > a > .btn").click()
    cy.wait(6000)
    cy.url().should("include", "/findbeds")
    cy.get(":nth-child(3) > .btn").click()
    cy.get(":nth-child(2) > p.text-center > a > .btn").click({ force: true })
    const todayDate = dayjs().format("YYYY-MM-DD")
    cy.get("input[type=date]").clear().type(`${todayDate}`)
    cy.get(".row > :nth-child(2) > .btn").click()
    cy.get(".modal-footer > .btn-primary").click()
    cy.wait(5000)
  })

  it("ทำการ login และเข้าสู่หน้าจองเตียง เพื่อทดสอบการเลือกวันที่ ในกรณีที่วันที่เลือก เป็นวันนี้หรือวันในอนาคต", () => {
    cy.visit("/login")
    cy.get('[type="email"]')
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com")
    cy.get('[type="password"]')
      .type("Passw0rd")
      .should("have.value", "Passw0rd")
    cy.get(".btn").click()
    cy.url().should("include", "/")
    cy.wait(5000)
    cy.get(":nth-child(1) > a > .btn").click()
    cy.url().should("include", "/findbeds")
    cy.get(":nth-child(3) > .btn").click()
    cy.get(":nth-child(2) > p.text-center > a > .btn").click({ force: true })
    const todayDate = dayjs().add(1, "day").format("YYYY-MM-DD")
    cy.get("input[type=date]").clear().type(`${todayDate}`)
    cy.get(".row > :nth-child(2) > .btn").click()
    cy.get(".modal-footer > .btn-primary").click()
    cy.wait(5000)
  })
})
