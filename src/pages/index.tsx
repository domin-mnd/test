import { Rows, Thead, Tree } from '@/components/pages/index';
import { Table } from '@/components/ui/Table';
import { EditModeProvider } from '@/context/editModeContext';
import { TreeRowProvider } from '@/context/treeRowContext';

export default function Home() {
  // Using fragments because page may have more elements
  return (
    <>
      <TreeRowProvider>
        <Table>
          <Thead />
          <tbody>
            <EditModeProvider>
              <Tree />
              <Rows />
            </EditModeProvider>
          </tbody>
        </Table>
      </TreeRowProvider>
    </>
  );
}
