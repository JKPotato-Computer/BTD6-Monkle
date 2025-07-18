import React, { useState } from "react";
import "../css/FAQ.css";

interface AccordionItemProps {
  question: string;
  children: React.ReactNode;
  eventKey: string;
  openKeys: Set<string>;
  setOpenKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  children,
  eventKey,
  openKeys,
  setOpenKeys,
}) => {
  const isOpen = openKeys.has(eventKey);

  const handleToggle = () => {
    const newOpenKeys = new Set(openKeys);
    if (isOpen) {
      newOpenKeys.delete(eventKey);
    } else {
      newOpenKeys.add(eventKey);
    }
    setOpenKeys(newOpenKeys);
  };

  return (
    <div className="faqBox container blue card mb-2">
      <div className="card-header" id={`heading${eventKey}`}>
        <h2 className="mb-0">
          <button
            className={`faqQuestion btn-block text-left ${
              isOpen ? "" : "collapsed"
            }`}
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls={`collapse${eventKey}`}
          >
            {question}
            <img
              src="src/assets/ui/ExpandButton.webp"
              className={isOpen ? "accordion-btn-open" : "accordion-btn-close"}
            />
          </button>
        </h2>
      </div>

      <div
        id={`collapse${eventKey}`}
        className={`collapse ${isOpen ? "show" : ""}`}
        aria-labelledby={`heading${eventKey}`}
      >
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

const MultiOpenFAQAccordion: React.FC = () => {
  // Explicitly define the type of the Set when initializing useState
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  return (
    <div className="accordion" id="faqAccordion">
      <AccordionItem
        question="What are your delivery options?"
        eventKey="1"
        openKeys={openKeys}
        setOpenKeys={setOpenKeys}
      >
        <p>
          We offer standard and express delivery options. Standard delivery
          typically takes 3-5 business days, while express delivery arrives
          within 1-2 business days.
        </p>
        <p>For more details, please refer to our shipping policy page.</p>
      </AccordionItem>

      <AccordionItem
        question="What is your return policy?"
        eventKey="3"
        openKeys={openKeys}
        setOpenKeys={setOpenKeys}
      >
        <p>
          We accept returns of unused and unworn items within 30 days of
          purchase. Items must be returned in their original packaging with all
          tags attached.
        </p>
        <p>
          Refunds will be processed to the original payment method within 7-10
          business days after we receive the returned item.
        </p>
        <p>
          Certain exclusions may apply. Please visit our returns page for a
          complete list of terms and conditions.
        </p>
      </AccordionItem>
    </div>
  );
};

export default MultiOpenFAQAccordion;
