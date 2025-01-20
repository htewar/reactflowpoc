import React, { useState, useEffect } from 'react';
import { Node } from 'reactflow';

interface NodeConfigPanelProps {
  node: Node | null;
  onClose: () => void;
  onUpdateNode: (updatedNode: Node) => void;
}

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({ node, onClose, onUpdateNode }) => {
  const [formData, setFormData] = useState({
    label: '',
    httpMethod: 'GET',
    url: '',
    requestBody: '',
    response: '',
    selectedField: '',
    assertionType: '',
    assertionResult: '',
  });
  const [isResponseVisible, setIsResponseVisible] = useState(false);

  useEffect(() => {
    if (node) {
      setFormData({
        label: node.data.label || '',
        httpMethod: node.data.httpMethod || 'GET',
        url: node.data.url || '',
        requestBody: node.data.requestBody || '',
        response: node.data.response || '',
        selectedField: node.data.selectedField || '',
        assertionType: node.data.assertionType || '',
        assertionResult: node.data.assertionResult || '',
      });
      setIsResponseVisible(false); // Reset response visibility when a new node is selected
    }
  }, [node]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (node) {
      const updatedNode = { ...node, data: { ...node.data, [name]: value } };
      onUpdateNode(updatedNode);
    }
  };

  const invokeApi = async () => {
    if (!formData.url) {
      setFormData((prevData) => ({ ...prevData, response: 'URL is required' }));
      return;
    }

    setFormData((prevData) => ({ ...prevData, response: 'Loading...' }));
    setIsResponseVisible(true); // Show response section when loading

    try {
      const res = await fetch('http://localhost:3001/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: formData.url,
          method: formData.httpMethod,
          body: formData.httpMethod !== 'GET' ? formData.requestBody : undefined,
        }),
      });
      const data = await res.json();
      setFormData((prevData) => ({ ...prevData, response: JSON.stringify(data, null, 2) }));

      if (node) {
        const updatedNode = { ...node, data: { ...node.data, response: JSON.stringify(data, null, 2) } };
        onUpdateNode(updatedNode);
      }
    } catch (error) {
      setFormData((prevData) => ({ ...prevData, response: `Error: ${error.message}` }));

      if (node) {
        const updatedNode = { ...node, data: { ...node.data, response: `Error: ${error.message}` } };
        onUpdateNode(updatedNode);
      }
    }
  };

  const handleAssertion = () => {
    let responseJson;
    try {
      responseJson = JSON.parse(formData.response);
    } catch (e) {
      setFormData((prevData) => ({ ...prevData, assertionResult: 'Invalid JSON response' }));
      return;
    }

    const fieldValue = responseJson[formData.selectedField];
    let result = '';

    switch (formData.assertionType) {
      case 'not_nil':
        result = fieldValue != null ? 'Pass' : 'Fail';
        break;
      case 'not_empty':
        result = fieldValue && fieldValue.length > 0 ? 'Pass' : 'Fail';
        break;
      default:
        result = 'Invalid assertion type';
    }

    setFormData((prevData) => ({ ...prevData, assertionResult: result }));

    if (node) {
      const updatedNode = { ...node, data: { ...node.data, assertionResult: result } };
      onUpdateNode(updatedNode);
    }
  };

  const responseFields = formData.response && formData.response !== 'Loading...' ? Object.keys(JSON.parse(formData.response)) : [];

  if (!node) return null;

  return (
    <div className="node-config-panel">
      <button className="close-button" onClick={onClose}>Close</button>
      <h3>Configure Node</h3>
      <div className="form-group">
        <label>Label:</label>
        <input type="text" name="label" value={formData.label} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>HTTP Method:</label>
        <select name="httpMethod" value={formData.httpMethod} onChange={handleChange}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="form-group">
        <label>URL:</label>
        <input type="text" name="url" value={formData.url} onChange={handleChange} />
      </div>
      {formData.httpMethod !== 'GET' && (
        <div className="form-group">
          <label>Request Body:</label>
          <textarea name="requestBody" value={formData.requestBody} onChange={handleChange} />
        </div>
      )}
      <button className="invoke-button" onClick={invokeApi} disabled={formData.response === 'Loading...'}>
        {formData.response === 'Loading...' ? <span className="loading-icon"></span> : 'Invoke API'}
      </button>
      <div className="response-section">
        <button className="expand-button" onClick={() => setIsResponseVisible(!isResponseVisible)}>
          {isResponseVisible ? 'Hide Response' : 'Show Response'}
        </button>
        {isResponseVisible && <pre className="response">{formData.response}</pre>}
      </div>
      {formData.response && formData.response !== 'Loading...' && (
        <>
          <div className="form-group">
            <label>Select Field:</label>
            <select name="selectedField" value={formData.selectedField} onChange={handleChange}>
              <option value="">Select a field</option>
              {responseFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Assertion Type:</label>
            <select name="assertionType" value={formData.assertionType} onChange={handleChange}>
              <option value="">Select an assertion</option>
              <option value="not_nil">Not Nil</option>
              <option value="not_empty">Not Empty</option>
            </select>
          </div>
          <button className="assert-button" onClick={handleAssertion}>
            Run Assertion
          </button>
          <pre className="assertion-result">{formData.assertionResult}</pre>
        </>
      )}
    </div>
  );
};

export default NodeConfigPanel;