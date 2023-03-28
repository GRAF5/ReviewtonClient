import React, { useEffect, useState } from 'react';
import { contentClient } from '../../clients/content.client';
import Autocomplete from '../../components/autocomplete/autocomplete';
import FormErrors from '../../components/form-errors/form-errors';
import InputStarRating from '../../components/star-rating/input-star-rating/InputStarRating';
import useWindowSize from '../../utils/useWindowSize';
import './create-article.css';
import 'react-quill/dist/quill.snow.css';
import Button from '../../components/button/button';
import { useNavigate, useParams } from 'react-router';
import ImageCompress from 'quill-image-compress';
import Quill from 'quill';
import PropTypes from 'prop-types';

export default function UpdateArticle({user, ...props}) {
  const [article, setArticle] = useState();
  const {width, contentWidth} = useWindowSize();
  const [inputs, setInputs] = useState({
    subject: '', tags: [], rating: 0
  });
  const [text, setText] = useState('');
  const [valid, setValid] = useState({
    subject: false, rating: false
  });
  const [subjects, setSubjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loadProcessing, setLoadProcessing] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();


  useEffect(() => {    
    Quill.register('modules/imageCompress', ImageCompress);
    const quill = new Quill('#editor', {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, 
            {'align': ''}, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
          ['link', 'image'],
          ['clean']
        ],
        imageCompress: {
          quality: 0.7, // default
          maxWidth: +process.env.REACT_APP_ARTICLE_MAX_IMAGE_SIZE, // default
          maxHeight: +process.env.REACT_APP_ARTICLE_MAX_IMAGE_SIZE, // default
          imageType: 'image/jpeg', // default
          debug: false, // default
          suppressErrorLogging: false, // default
          insertIntoEditor: false // default
        }
      },
      theme: 'snow',
      formats: [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'align',
        'link', 'image'
      ],
      placeholder: 'Ваш відгук'
    });
    quill.on('text-change', (delta, oldDelta, source) => {
      setText(quill.root.innerHTML);
    });    
    contentClient.getArticleById(id)
      .then(res => {
        setArticle(res);
        setInputs({...inputs, subject: res.subject.name, tags: res.tags.map(t => t.name), rating: res.rating});
        quill.setContents(quill.clipboard.convert(res.text), 'api');
        setValid({subject: res.subject ? true : false, rating: res.rating ? true : false});
      });
  }, []);
  useEffect(() => {
    setFilteredTags(tags.filter(tag => !inputs.tags.some(t => t === tag)));
  }, [inputs, tags]);

  useEffect(() => {
    setFormValid(checkValid());
  }, [valid]);  

  // eslint-disable-next-line complexity
  function handleChange(name, value, isValid) {
    if (name === 'subject' && value !== '') {
      if (!subjects.some(s => s.includes(value))) {
        contentClient.getSubjects(value)
          .then(res => {
            if (res.subjects.length) {
              setSubjects(subjects.concat(
                res.subjects.filter(s => !subjects.some(sub => sub === s.name)).map(s => s.name)));
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
      setInputs({...inputs, [name]:value});
    }
    if (valid !== valid[name] && name !== 'tag') {
      setValid({...valid, [name]: isValid});
    }
  }
  function addTag(tag) {
    setInputs({...inputs, tags: inputs.tags.some(t => t === tag) ? inputs.tags : inputs.tags.concat(tag) });
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
    setLoadProcessing(true);
    contentClient.updateArticle(id, {...inputs, text})
      .then(res => {
        return navigate('/', {replace: true});
      })
      .catch(res => {
        setErrors([res.message]);
      })
      .finally(() => {
        setLoadProcessing(false);
      });
  }
  return (
    <>      
      <div className='page-header'>
        <h1>Змінити відгук</h1>
      </div>
      <div className={contentWidth === width ? 'content' : 'bordered-content'}>
        <FormErrors key={'errors'} errors={errors} />
        <Autocomplete 
          name='subject' 
          label='Тема/Назва:'
          placeholder='Введіть або оберіть тему/назву'
          helperText='Краще вказати конкретну назву'
          valueProp={inputs.subject}
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
          helperText='Краще вказувати загальний опис чи характеристики'
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
        <div id="editor">
          <p></p>
        </div>
        <div style={{marginTop: '10px'}}></div>
        <Button disabled={!formValid} text='Написати' onClick={submit} />
      </div>
      {
        loadProcessing ? 
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} className='screen-fade'>
            <svg 
              className='loading-icon white' 
              viewBox="0 0 1024 1024" 
              version="1.1" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fill="currentColor" 
                // eslint-disable-next-line max-len
                d="M512.056 908.647c-84.516 0-166.416-27.084-235.266-78.637-84.15-63.028-138.741-155.109-153.675-259.2-14.934-104.119 11.559-207.816 74.588-291.994 130.162-173.812 377.438-209.25 551.194-79.172 72.844 54.562 124.819 133.228 146.391 221.484 3.684 15.103-5.569 30.319-20.644 34.003-15.075 3.572-30.319-5.541-34.003-20.644-18.45-75.628-63-143.044-125.466-189.816-148.866-111.516-360.844-81.112-472.444 67.866-54.028 72.141-76.725 161.016-63.9 250.256 12.797 89.241 59.597 168.131 131.737 222.131 149.006 111.656 360.956 81.197 472.5-67.781 29.194-39.009 49.219-82.716 59.456-129.938 3.319-15.188 18.366-24.834 33.441-21.544 15.188 3.291 24.834 18.281 21.544 33.441-12.009 55.181-35.353 106.2-69.413 151.762-63.028 84.15-155.109 138.769-259.256 153.675-18.984 2.756-37.941 4.106-56.784 4.106z"/>
            </svg>
          </div> : null
      }
    </>
  );
}

UpdateArticle.propTypes = {
  user: PropTypes.object
};
