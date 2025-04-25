import React, { useState, useRef } from 'react';
import FocusLock, { AutoFocusInside, MoveFocusInside } from 'react-focus-lock';
import focusLock from 'focus-lock';

// EXAMPLE 1: Basic React Modal with focus-lock
const AccessibleModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      {isOpen && (
        <div className="modal-overlay">
          <FocusLock>
            <div className="modal-content">
              <h2>Accessible Modal</h2>
              <p>This modal traps focus inside it for keyboard accessibility.</p>
              <button>Button 1</button>
              <button>Button 2</button>
              <button onClick={() => setIsOpen(false)}>Close Modal</button>
            </div>
          </FocusLock>
        </div>
      )}
    </div>
  );
};

// EXAMPLE 2: Advanced usage with custom return focus behavior
const AdvancedModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  return (
    <div>
      <button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open Advanced Modal
      </button>
      
      {isOpen && (
        <div className="modal-overlay">
          <FocusLock returnFocus={true} onDeactivation={() => buttonRef.current?.focus()}>
            <div className="modal-content">
              <h2>Advanced Modal</h2>
              <p>This modal returns focus to the button when closed.</p>
              <input type="text" placeholder="Focus starts here" autoFocus />
              <button>Next focusable element</button>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </FocusLock>
        </div>
      )}
    </div>
  );
};

// EXAMPLE 3: Using with conditionally disabled state
const DisablableFocusLock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lockEnabled, setLockEnabled] = useState(true);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Disablable Modal</button>
      
      {isOpen && (
        <div className="modal-overlay">
          <FocusLock disabled={!lockEnabled}>
            <div className="modal-content">
              <h2>Modal with Toggleable Focus Lock</h2>
              <p>You can enable or disable the focus lock.</p>
              <label>
                <input 
                  type="checkbox" 
                  checked={lockEnabled}
                  onChange={() => setLockEnabled(!lockEnabled)}
                />
                Enable focus lock
              </label>
              <button>Button 1</button>
              <button>Button 2</button>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </FocusLock>
        </div>
      )}
    </div>
  );
};

// EXAMPLE 4: Using with vanilla JavaScript (no React)
const initVanillaJSExample = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');
    const openButton = document.getElementById('openButton');
    const closeButton = document.getElementById('closeButton');
    
    let releaseLock: (() => void) | null = null;
    
    if (openButton && overlay && modal) {
      openButton.addEventListener('click', () => {
        overlay.classList.remove('hidden');
        // releaseLock = focusLock(modal);
      });
    }
    
    if (closeButton && overlay) {
      closeButton.addEventListener('click', () => {
        if (releaseLock) {
          //releaseLock();
        }
        overlay.classList.add('hidden');
      });
    }
  });
};

// EXAMPLE 5: Using with focus auto-restoration
const AutoFocusModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Auto-Focus Modal</button>
      
      {isOpen && (
        <div className="modal-overlay">
          <FocusLock returnFocus autoFocus={false}>
            <div className="modal-content">
              <h2>Auto Focus Modal</h2>
              <p>Notice how the specified input gets focus automatically.</p>
              <button>This won't get auto-focused</button>
              <AutoFocusInside>
                <input type="text" placeholder="This will be auto-focused" />
              </AutoFocusInside>
              <button onClick={() => setIsOpen(false)}>Close</button>
            </div>
          </FocusLock>
        </div>
      )}
    </div>
  );
};

// EXAMPLE 6: Group focus management
const GroupFocusModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState('group1');
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Group Focus Modal</button>
      
      {isOpen && (
        <div className="modal-overlay">
          <FocusLock>
            <div className="modal-content">
              <h2>Group Focus Modal</h2>
              
              <div className="tabs">
                <button 
                  onClick={() => setActiveGroup('group1')}
                  className={activeGroup === 'group1' ? 'active' : ''}
                >
                  Group 1
                </button>
                <button 
                  onClick={() => setActiveGroup('group2')}
                  className={activeGroup === 'group2' ? 'active' : ''}
                >
                  Group 2
                </button>
              </div>
              
              {activeGroup === 'group1' && (
                <MoveFocusInside>
                  <div className="tab-content">
                    <input type="text" placeholder="Group 1 input" />
                    <button>Group 1 button</button>
                  </div>
                </MoveFocusInside>
              )}
              
              {activeGroup === 'group2' && (
                <MoveFocusInside>
                  <div className="tab-content">
                    <input type="text" placeholder="Group 2 input" />
                    <button>Group 2 button</button>
                  </div>
                </MoveFocusInside>
              )}
              
              <button onClick={() => setIsOpen(false)}>Close Modal</button>
            </div>
          </FocusLock>
        </div>
      )}
    </div>
  );
};

export { 
  AccessibleModal, 
  AdvancedModal, 
  DisablableFocusLock, 
  initVanillaJSExample, 
  AutoFocusModal, 
  GroupFocusModal 
};