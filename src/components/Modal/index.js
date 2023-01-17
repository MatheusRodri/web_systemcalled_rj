
import { FiX } from 'react-icons/fi'
import './modal.css';

export default function Modal({ content, close }){
  return(
    <div className="modal">
      <div className="container">
        <button className="close" onClick={ close }>
          <FiX size={25} color="#FFF" />
          Back
        </button>

        <main>
          <h2>Request detail</h2>

          <div className="row">
            <span>
              Client: <i>{content.client}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Subject: <i>{content.subject}</i>
            </span>
            <span>
              Create at: <i>{content.createdFormat}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status: 
              <i className="status-badge" style={{ color: "#FFF", backgroundColor: content.status === 'Aberto' ? '#5cb85c' : '#999' }}>
                {content.status}
              </i>
            </span>
          </div>

          {content.complement !== '' && (
          <>
            <h3>Complement</h3>
            <p>
              {content.complement}
            </p>
          </>
          )}

        </main>
      </div>
    </div>
  )
}