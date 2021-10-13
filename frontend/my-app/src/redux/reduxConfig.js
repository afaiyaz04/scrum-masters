// Import config setup for pages that need to access redux

const mapStateToProps = (state) => ({
  user: state.user,
  contact: state.contact,
});

export { mapStateToProps };
