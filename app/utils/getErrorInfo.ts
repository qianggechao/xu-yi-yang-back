interface InvalidError {
  message: string;
  code: string;
  field: string;
}

const formatMsg = (errors: InvalidError[]) => {
  return (
    errors?.map(({ message, field }) => `${field} ${message}`)?.join() ||
    '入参错误'
  );
};

const getErrorInfo = (error: any) => {
  console.log('getErrorInfo', error);

  if (error?.code === 'invalid_param') {
    return {
      error,
      success: false,
      status: 400,
      msg: formatMsg(error.errors),
    };
  }

  return {
    success: false,
    msg: error?.message || 'Server error',
    status: error?.status || 501,
    data: null,
    error,
  };
};

export default getErrorInfo;
