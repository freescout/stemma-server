module.exports = mongoose => {
  const Partnership = mongoose.model(
    'partnerships',
    mongoose.Schema(
      {
        partnerships: [
          {
            type: { type: String, enum: ['marriage', 'living together', 'Other'], default: 'marriage' },
            date_starts: Date,
            date__ends: Date,
            place: String,
            individuals: [
              {
                id: String,
                role: String
              }
            ]
          }
        ]
      }
    ));
  return Partnership;
};
