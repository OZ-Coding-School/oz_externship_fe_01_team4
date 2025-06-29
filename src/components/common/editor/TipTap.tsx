import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { cn } from '@utils/cn'
import BoldIcon from '@assets/icons/editor/bold.svg?react'
import ItalicIcon from '@assets/icons/editor/italic.svg?react'
import StrikeThroughIcon from '@assets/icons/editor/strikeThrough.svg?react'
import OrderedListIcon from '@assets/icons/editor/orderedList.svg?react'
import UnorderedListIcon from '@assets/icons/editor/unorderedList.svg?react'
import IndentIcon from '@assets/icons/editor/indent.svg?react'
import Icon from '@components/common/Icon'
import UnderlineIcon from '@assets/icons/editor/underline.svg?react'

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  const buttonClass =
    'px-3 py-1 text-sm font-medium border border-transparent rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
  const activeButtonClass = 'bg-gray-300 hover:bg-gray-100'

  return (
    <div className="flex items-center gap-[10px] border border-[#D2D2D2]">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(buttonClass, {
          [activeButtonClass]: editor.isActive('bold'),
        })}
      >
        <Icon icon={BoldIcon} size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(buttonClass, {
          [activeButtonClass]: editor.isActive('italic'),
        })}
      >
        <Icon icon={ItalicIcon} size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(buttonClass, {
          [activeButtonClass]: editor.isActive('strike'),
        })}
      >
        <Icon icon={StrikeThroughIcon} size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={cn(buttonClass, {
          [activeButtonClass]: editor.isActive('orderedList'),
        })}
      >
        <Icon icon={OrderedListIcon} size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={cn(buttonClass, {
          [activeButtonClass]: editor.isActive('bulletList'),
        })}
      >
        <Icon icon={UnorderedListIcon} size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        className={cn(buttonClass, {
          [activeButtonClass]: editor.isActive('blockquote'),
        })}
      >
        <Icon icon={IndentIcon} size={14} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={cn(buttonClass, {
          [activeButtonClass]: editor.isActive('underline'),
        })}
      >
        <Icon icon={UnderlineIcon} size={14} />
      </button>
    </div>
  )
}

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: '',

    editorProps: {
      attributes: {
        class: cn(
          'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl',
          'min-h-[164px]  border border-[#D2D2D2] border-t-0 p-4 text-[11px]',
          'focus:outline-none'
        ),
      },
    },
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
