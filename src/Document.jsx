import React from 'react';
import devalue from 'devalue';

const RenderJudge = ({ value, active, inactive }) => (value ? active : inactive);

RenderJudge.defaultProps = {
  value: true,
  active: null,
  inactive: null
};

const Document = ({ body, pageScripts, pageStyles, state, helmet, context, id }) => (
  <html {...helmet.htmlAttributes.toComponent()}>
    <head>
      {helmet.base.toComponent()}
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      {helmet.style.toComponent()}
      {helmet.noscript.toComponent()}
      {pageStyles.map((href) => (<link href={href} key={href} rel="stylesheet" />))}
    </head>
    <body {...helmet.bodyAttributes.toComponent()}>
      <div id={id} dangerouslySetInnerHTML={{ __html: body }} />

      <RenderJudge
        value={!!state}
        active={(
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window.${context}=${devalue(state)}` }} />)}
      />
      {pageScripts.map((src) => (<script src={src} key={src} type="text/javascript" defer />))}
      {helmet.script.toComponent()}
    </body>
  </html>
);

export default Document;
