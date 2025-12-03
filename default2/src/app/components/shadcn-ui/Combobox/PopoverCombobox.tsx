import CodePreview from '../../shared/CodePreview'
import PopoverComboCode from './code/PopoverComboCode'

const PopoverCombobox = () => {
  return (
    <>
      <CodePreview
        component={<PopoverComboCode />}
        filePath='src/app/components/shadcn-ui/Combobox/code/PopoverComboCode.tsx'
        title='Popover Combobox'
      />
    </>
  )
}

export default PopoverCombobox

