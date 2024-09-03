import { useState, useRef, useEffect } from "react";
import {
  Section,
  TableHead,
  TableRow,
  TableCont,
  TextField,
} from "../components";
import {
  tableHeadDataExpenditure,
  initialCreateExpenditureValues,
  ExpenditureInfoFieldsData,
} from "../data";
import { Formik, Form, FieldArray } from "formik";
import { CreateExpenditureSchema } from "../schema";
import {
  useExpenditureMutationAsync,
  FetchExpenditureData,
  useUpdateExpenditure,
  useDeleteExpenditure,
} from "../function";
import toast from "react-hot-toast";
import { generateClassExpNumber } from "../function/generateVoucherNumber"; // Import the function
import SidebarV from '../components/SidebarV';
import { UseToggle } from "../hooks";
import { useNavigate } from "react-router-dom";

export const Expenditure = () => {
  const [openCreateExpenditure, setCreateExpenditure] = useState(false);
  const [openEditExpenditure, setEditExpenditure] = useState(false);
  const [editExpenditureData, setEditExpenditureData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isOpenModal, setOpenModal] = UseToggle(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activePage, setActivePage] = useState('Expenditure');
  const [filter, setFilter] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const underlineRef = useRef(null);
  const containerRef = useRef(null);
  const balanceTabRef = useRef(null);
  const navigate = useNavigate();
  const openModal = () => setOpenModal(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleTabClick = (index) => setActiveTab(index);
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const { expenditureData, expenditureFetching, expenditureLoading, expenditureError } = FetchExpenditureData();
  const { mutationAsync: createExpenditureMutation } = useExpenditureMutationAsync(
    {
      method: "post",
      url: "api/v1/expenditure/create",
    },
    ["expenditure"]
  );
  const { mutationAsync: updateExpenditureMutation } = useUpdateExpenditure();
  const { mutationAsync: deleteExpenditureMutation } = useDeleteExpenditure();

  const handleEditClick = (expenditure) => {
    setEditExpenditureData(expenditure);
    setEditExpenditure(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this expenditure?")) {
      try {
        const response = await deleteExpenditureMutation.mutateAsync(id);
        if (response.status === 200) {
          toast.success("Expenditure deleted successfully");
        }
      } catch (error) {
        toast.error("Error deleting expenditure");
        console.error(error);
      }
    }
  };

  const CreateExpenditureElements = ExpenditureInfoFieldsData?.map((data, index) => (
    <TextField
      key={index}
      label={data.label}
      name={data.name}
      type={data.type}
      readOnly={data.readOnly} // Pass the readOnly property
      placeholder={data.placeholder}
    />
  ));

  useEffect(() => {
    const activeTab = document.querySelector(`.tab-${activePage}`);
    if (activeTab && underlineRef.current && containerRef.current) {
      if (activePage === 'balance' && balanceTabRef.current) {
        const balanceTabLeft = balanceTabRef.current.offsetLeft;
        const containerWidth = containerRef.current.offsetWidth;
        underlineRef.current.style.width = `${containerWidth - balanceTabLeft}px`;
        underlineRef.current.style.transform = `translateX(${balanceTabLeft}px)`;
      } else {
        underlineRef.current.style.width = `${activeTab.offsetWidth}px`;
        underlineRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`;
      }
    }
  }, [activePage]);
  console.log('Rendering voucher component');

  return (
    <div className="flex">
      <SidebarV />
      <main className="flex flex-col bg-gray-100 text-black h-full w-screen m-0 mt-14 lg:ml-64 lg:mr-10">
        <section className="border-gray-400 p-5 w-full bg-white">
          <div className="flex flex-col gap-y-3 w-full">
            <div className="flex justify-between gap-x-3 items-center w-full">
              <div ref={containerRef} className='flex flex-row gap-x-3 w-full border-b-2 border-green-200'>
              <div className="relative flex flex-row gap-x-3 ">
      {openCreateExpenditure && (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5">
          <h1 className="text-2xl font-semibold">Create Expenditure</h1>

          <Formik
            initialValues={{
              ...initialCreateExpenditureValues,
              classExp: generateClassExpNumber(), // Set the value for classExp
              subclasses: [{ name: "" }] // Initialize with one subclass
            }}
            validationSchema={CreateExpenditureSchema}
            onSubmit={async (values, actions) => {
              try {
                const response = await createExpenditureMutation.mutateAsync(values);
                if (response.status === 200) {
                  toast.success("Expenditure created successfully");
                }
                actions.resetForm();
                setCreateExpenditure(false);
              } catch (error) {
                toast.error("Error creating expenditure");
                console.error(error);
              }
            }}
          >
            {({ values }) => (
              <Form>
                <div className="grid grid-cols-3 gap-5 grid-flow-dense place-content-center">
                  {CreateExpenditureElements}

                

                  <FieldArray name="subclasses">
                    {({ remove, push }) => (
                      <div>
                        {values.subclasses.length > 0 &&
                          values.subclasses.map((subclass, index) => (
                            <div key={index} className="mb-4">
                              <TextField
                                label={`Subclass ${index + 1}`}
                                name={`subclasses.${index}.name`}
                                type="text"
                                placeholder="Enter subclass"
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="bg-red-500 text-white p-2 rounded mt-2"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        <button
                          type="button"
                          onClick={() => push({ name: "" })}
                          className="bg-primary text-white p-2 rounded mt-4"
                        >
                          Add Subclass
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <button
                    type="submit"
                    className="bg-primary text-black font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                  >
                    Create Expenditure
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {openEditExpenditure && editExpenditureData && (
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-white z-10 p-5">
          <h1 className="text-2xl font-semibold">Update Expenditure</h1>

          <Formik
            initialValues={{
              ...editExpenditureData,
              subclasses: editExpenditureData.subclasses || [{ name: "" }] // Initialize with one subclass if not present
            }}
            validationSchema={CreateExpenditureSchema}
            onSubmit={async (values, actions) => {
              try {
                const response = await updateExpenditureMutation.mutateAsync({ id: editExpenditureData._id, data: values });
                if (response.status === 200) {
                  toast.success("Expenditure updated successfully");
                }
                actions.resetForm();
                setEditExpenditure(false);
                setEditExpenditureData(null);
              } catch (error) {
                toast.error("Error updating expenditure");
                console.error(error);
              }
            }}
          >
            {({ values }) => (
              <Form>
                <div className="grid grid-cols-3 gap-5 grid-flow-dense place-content-center">
                  {CreateExpenditureElements}

         
                  <FieldArray name="subclasses">
                    {({ remove, push }) => (
                      <div>
                        {values.subclasses.length > 0 &&
                          values.subclasses.map((subclass, index) => (
                            <div key={index} className="mb-4">
                              <TextField
                                label={`Subclass ${index + 1}`}
                                name={`subclasses.${index}.name`}
                                type="text"
                                placeholder="Enter subclass"
                              />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="bg-red-500 text-white p-2 rounded mt-2"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        <button
                          type="button"
                          onClick={() => push({ name: "" })}
                          className="bg-primary text-white p-2 rounded mt-4"
                        >
                          Add Subclass
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <button
                    type="submit"
                    className="bg-primary text-black font-bold h-fit m-auto w-full p-2 mt-8 rounded-md"
                  >
                    Update Expenditure
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      
      
      <Section style="bg-white flex flex-col gap-5 w-full overflow-x-auto">
        <div className="flex flex-row gap-5 self-end mb-6">
          <select className="w-fit p-2 rounded-md bg-transparent border-2 border-gray-400">
            <option defaultValue>Filter Categories</option>
            <option value="">Product 1</option>
            <option value="">Product 2</option>
            <option value="">Product 3</option>
            <option value="">Product 4</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="rounded-md bg-transparent border-2 border-gray-400 p-2"
          />
          <div
            className="bg-accent-dark py-1 px-2 items-center justify-center gap-1 rounded-md flex w-24 flex-row text-white font-medium"
            aria-label="Add Product"
            role="button"
            tabIndex={0}
            onClick={() => setCreateExpenditure((prev) => !prev)}
          >
            <span>Add</span>
          </div>
        </div>

        {expenditureFetching || expenditureLoading ? (
          <div className="text-center">
            <h1 className="text-2xl uppercase">Loading</h1>
          </div>
        ) : expenditureError ? (
          <div className="text-center">
            <h1 className="text-2xl uppercase text-red-500">Error fetching expenditure data</h1>
          </div>
        ) : (
          <TableCont>
            <TableHead tableData={tableHeadDataExpenditure} />
            {expenditureData?.data?.map((expenditure) => (
              <TableRow
                key={expenditure._id}
                tableRowData={{
                  ...expenditure,
                  subclasses: expenditure.subclasses.map(subclass => subclass.name).join(', ') // Join subclass names into a string
                }}
                onEditClick={() => handleEditClick(expenditure)}
                onDeleteClick={() => handleDeleteClick(expenditure._id)}
              />
            ))}
          </TableCont>
        )}
      </Section>
    </div></div></div></div></section></main></div>
  );
};
