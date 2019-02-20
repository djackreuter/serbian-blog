import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  rows,
  cols,
  name,
  placeholder,
  error,
  id,
  value,
  disabled,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        rows={rows}
        cols={cols}
        className={classnames("form-control form-control-lg", {
          'is-invalid': error
        })} 
        placeholder={placeholder}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        id={id}
      >
      </textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  rows: PropTypes.string,
  cols: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  error: PropTypes.string
}

export default TextAreaFieldGroup;
