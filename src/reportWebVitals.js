const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ getMetrics }) => {
      getMetrics(onPerfEntry);
    }).catch(err => {
      console.error('Error loading web-vitals module:', err);
    });
  }
};

export default reportWebVitals;