import './panel.css'

import { Fragment, type FunctionComponent } from 'react'

type PanelProps = {
  information: {
    name: string
    values: {
      name: string
      value: string
    }[]
  }
}

export const Panel: FunctionComponent<PanelProps> = ({ information: { name, values } }) => {
  return (
    <aside class='panel'>
      <p>{name}</p>
      <dl>
        {values.map(({ name, value }) => (
          <Fragment key={name}>
            <dt>{name}</dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
      </dl>
    </aside>
  )
}
