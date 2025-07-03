const checkDuplicate = async (Model, where) => {
  const found = await Model.findOne({ where });
  return !!found;
};

module.exports = { checkDuplicate };
