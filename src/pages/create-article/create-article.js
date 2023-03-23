import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { contentClient } from '../../clients/content.client';
import Autocomplete from '../../components/autocomplete/autocomplete';
import FormErrors from '../../components/form-errors/form-errors';
import InputStarRating from '../../components/star-rating/input-star-rating/InputStarRating';
import useWindowSize from '../../utils/useWindowSize';
import './create-article.css'
import 'react-quill/dist/quill.snow.css';
import Button from '../../components/button/button';
import { useNavigate } from 'react-router';

export default function CreateArticle({user, ...props}) {
  const {width, contentWidth} = useWindowSize();
  const [inputs, setInputs] = useState({
    subject: '', tags: [], rating: 0, text: ''
  });
  const [valid, setValid] = useState({
    subject: false, rating: false
  });
  const [subjects, setSubjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    setFilteredTags(tags.filter(tag => !inputs.tags.some(t => t === tag)));
  }, [inputs, tags]);

  useEffect(() => {
    setFormValid(checkValid());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid]);  

  function handleChange(name, value, isValid) {
    if (name === 'subject' && value !== '') {
      if (!subjects.some(s => s.includes(value))) {
        contentClient.getSubjects(value)
          .then(res => {
            if (res.subjects.length) {
              setSubjects(subjects.concat(res.subjects.filter(s => !subjects.some(sub => sub === s.name)).map(s => s.name)));
            }
          });
      }
    } else if (name === 'tag' && value !== '' && value !== inputs[name]) {
      contentClient.getTags(value)
        .then(res => {
          if (res.tags.length) {
            setTags(tags.concat(res.tags.filter(t => !tags.some(tag => tag === t.name)).map(t => t.name)));
          }
        });
    }
    if (value !== inputs[name]) {
      setInputs(inputs => ({...inputs, [name]:value}));
    }
    if (valid !== valid[name] && name !== 'tag') {
      setValid(valid => ({...valid, [name]: isValid}));
    }
  }
  function addTag(tag) {
    setInputs({...inputs, tags: inputs.tags.some(t => t === tag) ? inputs.tags : inputs.tags.concat(tag) })
  }
  function handleRating(e) {
    setValid({...valid, rating: true});
    setInputs({...inputs, rating: e.target.value});
  }
  function checkValid() {
    for (let el of Object.keys(valid)) {
      if (!valid[el]) {
        return false;
      }
    }
    return true;
  }
  function submit() {
    setErrors([]);
    contentClient.createArticle(inputs)
      .then(res => {
        return navigate('/', {replace: true});
      })
      .catch(res => {
        setErrors([res.message]);
      });
  }

  return(
    <>      
      <div className='page-header'>
        <h1>Додати статтю</h1>
      </div>
      <div className={contentWidth === width ? 'content' : 'bordered-content'}>
        <FormErrors key={'errors'} errors={errors} />
        <Autocomplete 
          name='subject' 
          label='Тема/Назва:'
          placeholder='Введіть або оберіть тему/назву'
          required={true}
          onChange={handleChange}
          options={subjects}
        />
        <div style={{marginTop: '10px'}}></div>
        <label className={'field-label'} >Теги:</label>
        <div style={{marginTop: '10px'}}></div>
        <div style={{
          'display': 'flex',
          flexWrap: 'wrap'
        }}>
          {inputs.tags.map((tag, i) => 
            <div 
              style={{
                position: 'relative'
              }}
              tabIndex={0} 
              key={i} 
              className='tag-el' >
                <div style={{
                  position: 'absolute',
                  transform: 'translate(-20px, -70%)',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'end'
                }}><p
                  className='remove-tag'
                  tabIndex={0}
                  onClick={() => setInputs({...inputs, tags: inputs.tags.filter(t => t !== tag)})}
                >x</p></div>
              {tag}
            </div>)}
        </div>
        <Autocomplete 
          name='tag' 
          placeholder='Введіть або оберіть тег'
          onChange={handleChange}
          options={filteredTags}
          button={{
            text: 'Додати',
            reset: true,
            onClick: addTag
          }}
        />
        <div style={{marginTop: '10px'}}></div>
        <div style={{display: 'flex', alignItems: 'center'}}>          
          <label style={{marginBottom: '0'}} className={'field-label'} >Оцінка:</label>
          &nbsp;
          <InputStarRating rating={inputs.rating} handleClick={handleRating} />
        </div>
        <div style={{marginTop: '10px'}}></div>
        <label style={{marginBottom: '0'}} className={'field-label'} >Ваш відгук:</label>
        <ReactQuill 
                    value={inputs.text}
                    onChange={(text) => setInputs({...inputs, text})}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline','strike', 'blockquote'],
                        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                        ['link'],
                        ['clean']
                      ],
                    }}
                    formats={[
                      'header',
                      'bold', 'italic', 'underline', 'strike', 'blockquote',
                      'list', 'bullet', 'indent',
                      'link'
                    ]}   
                    placeholder="Ваш відгук"
                    style={{fontSize: '18px'}}
                /> 
        <div style={{marginTop: '10px'}}></div>
        <Button disabled={!formValid} text='Написати' onClick={submit} />
      </div>
    </>
  )
}