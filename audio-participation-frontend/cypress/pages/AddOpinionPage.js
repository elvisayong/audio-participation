class AddOpinionPage {
  visit(planId) {
      cy.visit(`/opinions/${planId}`);
  }

  startRecording() {
      cy.get('[data-cy=start-recording-button]').click();
  }

  stopRecording() {
      cy.get('[data-cy=stop-recording-button]').click();
  }

  uploadVoiceNote() {
      cy.get('[data-cy=upload-voice-note-button]').click();
  }

  verifyOpinionSubmitted() {
      cy.get('[data-cy=opinion-submitted]').should('be.visible');
  }
}

export default AddOpinionPage;
