import type { FunctionComponent } from 'react'

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
      <h2 class='panel-name'>{name}</h2>
      <dl>
        {values.map((e) => {
          const { name, value } = e

          return (
            <div key={name} class='panel-row'>
              <dt>{name}</dt>
              <dd>{value}</dd>
            </div>
          )
        })}
      </dl>
    </aside>
  )
}
