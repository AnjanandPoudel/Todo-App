class SetErrorResponse extends Error {
    constructor(status=404,value="Not Found") {
      super(value);
      this._meta_ = {
        error: value,
        status:status
      };
    }
  };
  

  module.exports= {SetErrorResponse};