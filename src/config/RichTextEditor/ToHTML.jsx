import React from 'react';
import { Link } from 'react-router-dom';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

const styles = {
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 20,
  },
};

const addBreaklinesInline = (children) => {
  if (typeof children[0] == 'string') {
    const s = children[0].endsWith('\n')
      ? children[0].slice(0, -1)
      : children[0];

    if (s.split('\n').length > 1) {
      return s.split('\n').map((child, index) => (
        <React.Fragment key={child + index}>
          {child}
          <br />
        </React.Fragment>
      ));
    }
  }
  return children;
};

// Inline (not block) styles
const inline = {
  BOLD: (children, { key }) => (
    <strong key={key}>{addBreaklinesInline(children)}</strong>
  ),
  ITALIC: (children, { key }) => (
    <em key={key}>{addBreaklinesInline(children)}</em>
  ),
  UNDERLINE: (children, { key }) => (
    <u key={key}>{addBreaklinesInline(children)}</u>
  ),
  CODE: (children, { key }) => (
    <span key={key} style={styles.code}>
      {children}
    </span>
  ),
};

const addBreaklines = (children) =>
  children.map((child) => {
    return child[1].map((child) => [
      <React.Fragment key={child}>
        {child}
        <br />
      </React.Fragment>,
    ]);
  });

const splitBySoftLines = (children) =>
  children.map((child) => {
    return child.map((item) => {
      if (Array.isArray(item)) {
        return item[0].split('\n');
      }
      return item;
    });
  });

// Returns how the default lists should be rendered
const getList = (ordered) => (children, { depth, keys }) =>
  ordered ? (
    <ol key={keys[0]} keys={keys} depth={depth}>
      {children.map((child, i) => (
        <li key={keys[i]}>{child}</li>
      ))}
    </ol>
  ) : (
    <ul key={keys[0]} keys={keys} depth={depth}>
      {children.map((child, i) => (
        <li key={keys[i]}>{child}</li>
      ))}
    </ul>
  );

// Special function to deal with list clones
/*const getSpecialList = type => (children, { depth, keys }) => (
  <ul key={keys[0]} keys={keys} depth={depth} className={type}>
    {children.map((child, i) => (
      <li key={keys[i]} className={`${type}-item`}>
        {child}
      </li>
    ))}
  </ul>
);
*/

// Original recommended way to deal with atomics, this does not work with IMAGE
// const getAtomic = (children, { data, keys }) =>
//   data.map((item, i) => <div key={keys[i]} {...data[i]} />);

const processChildren = (children, keys) => {
  const processedChildren = children.map((chunks) =>
    chunks.map((child) => {
      if (Array.isArray(child)) {
        // If it's empty is a blank paragraph, we want to add a <br /> in it
        if (isEmpty(child)) {
          return <br key="br" />;
        }
        return child.map((subchild, index) => {
          if (typeof subchild === 'string') {
            return subchild.split('\n').map((item, index) => (
              <React.Fragment key={index}>
                {item}
                {<br />}
              </React.Fragment>
            ));
          } else {
            return subchild;
          }
        });
      } else {
        return child;
      }
    }),
  );
  return processedChildren.map(
    (chunk, index) => chunk && <p key={keys[index]}>{chunk}</p>,
  );
};
/**
 * Note that children can be maped to render a list or do other cool stuff
 */
const blocks = {
  unstyled: (children, { keys }) => {
    return processChildren(children, keys);
  },
  atomic: (children) => children[0],
  blockquote: (children, { keys }) => (
    <blockquote key={keys[0]}>
      {addBreaklines(splitBySoftLines(children))}
    </blockquote>
  ),
  'header-one': (children, { keys }) =>
    children.map((child, i) => <h1 key={keys[i]}>{child}</h1>),
  'header-two': (children, { keys }) =>
    children.map((child, i) => (
      <h2 id={keys[i]} key={keys[i]}>
        {child}
      </h2>
    )),
  'header-three': (children, { keys }) =>
    children.map((child, i) => (
      <h3 id={keys[i]} key={keys[i]}>
        {child}
      </h3>
    )),
  'header-four': (children, { keys }) =>
    children.map((child, i) => (
      <h4 id={keys[i]} key={keys[i]}>
        {child}
      </h4>
    )),
  'header-five': (children, { keys }) =>
    children.map((child, i) => (
      <h5 id={keys[i]} key={keys[i]}>
        {child}
      </h5>
    )),
  'header-six': (children, { keys }) =>
    children.map((child, i) => (
      <h6 id={keys[i]} key={keys[i]}>
        {child}
      </h6>
    )),
  'code-block': (children, { keys }) => (
    <pre key={keys[0]} style={styles.codeBlock}>
      {addBreaklines(children)}
    </pre>
  ),
  'unordered-list-item': getList(),
  'ordered-list-item': getList(true),
  callout: (children, { keys }) =>
    children.map((child, i) => (
      <p key={keys[i]} className="callout">
        {child}
      </p>
    )),
};

const LinkEntity = connect((state) => ({
  token: state.userSession.token,
}))(({ token, key, url, target = '_blank', targetUrl, download, children }) => {
  const to = token ? url : targetUrl || url;
  if (download) {
    return token ? (
      <Link key={key} to={flattenToAppURL(to)}>
        {children}
      </Link>
    ) : (
      <a key={key} href={download}>
        {children}
      </a>
    );
  }
  return isInternalURL(to) ? (
    <Link key={key} to={flattenToAppURL(to)}>
      {children}
    </Link>
  ) : (
    <a key={key} href={to} target={target} rel="noopener noreferrer">
      {children}
    </a>
  );
});

const entities = {
  LINK: (children, props, { key }) => (
    <LinkEntity key={key} {...props}>
      {children}
    </LinkEntity>
  ),

  IMAGE: (children, entity, { key }) => (
    <img key={key} src={entity.src} alt={entity.alt} />
  ),
};

export const options = {
  cleanup: false,
  // joinOutput: true,
};

const renderers = {
  inline,
  blocks,
  entities,
};

export default renderers;
