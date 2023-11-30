import React from "react";
import PropTypes from "prop-types";

export interface LabelProps {
  label: string;
  required?: boolean;
}

function Label({ label, required }: LabelProps) {
  return (
    <p className="mb-2">
      {label}
      {required && <span className="text-orange-600 ml-1">*</span>}
    </p>
  );
}

export default Label;
