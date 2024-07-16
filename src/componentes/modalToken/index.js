import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";

export function ModalToken({ openModal, setOpenModal }) {
  // O estado openModal e a função setOpenModal são recebidos como props

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>ACESSO NEGADO</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              POR FAVOR REALIZE O LOGIN, OU CADASTRE-SE
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to='/LoginAdmin'><Button onClick={() => setOpenModal(false)}>Login</Button></Link>
          <Link to='/CadastrarAdmin'><Button onClick={() => setOpenModal(false)}>Cadastro-se</Button></Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}
