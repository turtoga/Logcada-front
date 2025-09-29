import React from 'react';
import './RoleInput.scss'

interface RoleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function RoleInput({ value, onChange }: RoleInputProps) {
  return (
    <div className="role-input">
      <label className="label" htmlFor="role">Tipo</label>
      <select
        id="role"
        name="role"
        value={value}
        onChange={onChange}
        required
      >
        <option value="PADRAO">Padrão</option>
        <option value="ADMIN">Admin</option>
      </select>
    </div>
  );
}

export default RoleInput;
