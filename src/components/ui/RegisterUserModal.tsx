import React, { useState } from 'react';
import { UserPlus, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useCineMatch } from '../../hooks/useCineMatch';
import { Button } from './Button';
import './RegisterUserModal.css';

export const RegisterUserModal: React.FC = () => {
  const { isRegisterModalOpen, setIsRegisterModalOpen, registerUser } = useCineMatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [customId, setCustomId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isRegisterModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (name.trim().length < 2) {
      setErrorMessage('El nombre debe tener al menos 2 caracteres.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Introduce un correo electrónico válido.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = await registerUser({
        name: name.trim(),
        email: email.trim(),
        id: customId.trim() || undefined
      });

      setSuccessMessage(`¡Usuario ${newUser.name} registrado con ID '${newUser.id}'! Sesión activa actualizada.`);
      setName('');
      setEmail('');
      setCustomId('');

      setTimeout(() => {
        setIsRegisterModalOpen(false);
        setSuccessMessage(null);
      }, 1800);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al registrar el usuario en el backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cm-modal-overlay" onClick={() => !isSubmitting && setIsRegisterModalOpen(false)}>
      <div className="cm-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="cm-modal-header">
          <div className="cm-modal-title-wrap">
            <UserPlus size={20} color="var(--brand-primary, #7C3AED)" />
            <h3 className="cm-modal-title">Registrar Nuevo Usuario</h3>
          </div>
          <button
            type="button"
            className="cm-modal-close-btn"
            onClick={() => setIsRegisterModalOpen(false)}
            disabled={isSubmitting}
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="cm-modal-body">
            {errorMessage && (
              <div className="cm-modal-alert cm-modal-alert-error">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="cm-modal-alert cm-modal-alert-success">
                <CheckCircle size={16} />
                <span>{successMessage}</span>
              </div>
            )}

            <div className="cm-form-group">
              <label className="cm-form-label" htmlFor="reg-name">Nombre completo *</label>
              <input
                id="reg-name"
                type="text"
                className="cm-form-input"
                placeholder="Ej. Valeria Domínguez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="cm-form-group">
              <label className="cm-form-label" htmlFor="reg-email">Correo electrónico *</label>
              <input
                id="reg-email"
                type="email"
                className="cm-form-input"
                placeholder="valeria@cinematch.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="cm-form-group">
              <label className="cm-form-label" htmlFor="reg-id">ID de usuario (Opcional)</label>
              <input
                id="reg-id"
                type="text"
                className="cm-form-input"
                placeholder="Ej. u006 (se genera automático si se omite)"
                value={customId}
                onChange={(e) => setCustomId(e.target.value)}
                disabled={isSubmitting}
              />
              <span className="cm-form-hint">
                Se indexará en tiempo O(1) en la Tabla Hash y se añadirá como vértice al Grafo Bipartito.
              </span>
            </div>
          </div>

          <div className="cm-modal-footer">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsRegisterModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={<UserPlus size={15} />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registrando...' : 'Registrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
