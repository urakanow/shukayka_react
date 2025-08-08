"use client"
import TextInputField from "@/components/TextInputField";
import { useFloating, offset, shift, autoUpdate, useClick, useDismiss, useRole, useInteractions } from "@floating-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from './styles.module.css';
import InputLabel from "@/components/InputLabel";

interface Department {
    name: string
}

interface DepartmentDropdownProps {
    city: string,
    onSelect: (department: string) => void,
    isDepartment: boolean
}

function DepartmentDropdown({ city, onSelect, isDepartment }: DepartmentDropdownProps) {
    const novaPostApiAddress = "https://api.novaposhta.ua/v2.0/json/";
    const novaPostApiKey = "374d971fa3b5e69039dd30184a3b5c6e";
    const departmentRef = "841339c7-591a-42e2-8233-7a0a00f0ed6f";
    const postomatRef = "f9316480-5f2d-425d-bc2c-ac7cd29decf0";

    const [departmentName, setDepartmentName] = useState('');
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [departments, setDepartments] = useState<Department[]>([]);
    
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    // const [isDepartment, setIsDepartment] = useState<boolean>(true);//false is postomat

    useEffect(() => {
        console.log("is department: ", isDepartment)
        setIsOpen(false)
        setActiveIndex(null)
        setDepartments([])
        setDepartmentName('')
    }, [isDepartment])
    
    const handleDepartmentNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDepartmentName(value);
        
        // Clear any existing timeout
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        
        // Only set new timeout if field isn't empty
        if (value.trim() !== '') {
            debounceTimeoutRef.current = setTimeout(() => {
                if(!city){
                    console.log("city is required for the department search")
                    return
                }
                fetchNovaPostDepartments(value);
                // Here you would call your actual action (e.g., fetchNovaPostDepartments)
            }, 2000); // 2 second delay
        }
    };

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, []);    

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom-start",
        middleware: [offset(4), shift()],
        whileElementsMounted: autoUpdate,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "listbox" });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
        click,
        dismiss,
        role,
    ]);

    const handleSelect = (department: Department, index: number) => {
        setActiveIndex(index);
        onSelect(department.name);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown_container}>
            {activeIndex == null ? (
                <>
                    {/* <InputLabel text="Postomat" htmlFor="department" /> */}
                    <TextInputField label="Name" id="departmentName"
                    value={departmentName}
                    onChange={handleDepartmentNumberChange}
                    ref={refs.setReference}
                    {...getReferenceProps()}
                    />
                </>
            ) : (
                <>
                    {/* <InputLabel text="Postomat" htmlFor="department" /> */}
                    <InputLabel text="Name" htmlFor="department" />

                    <span id="department"
                    className={styles.dropdown_item}
                    ref={refs.setReference}
                    {...getReferenceProps()}
                    >
                        {departments[activeIndex].name}
                        
                        <button onClick={(e) => {
                            e.preventDefault();
                            console.log("x clicked");
                            setActiveIndex(null);
                        }} className={styles.cancel_button}>x</button>
                    </span>

                </>
                
            )}

        {isOpen && (
            <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={`${styles.dropdown_menu} vertical_container`}
            {...getFloatingProps()}
            >
            {departments.map((department, index) => (
                <button
                key={index}
                className={`${styles.dropdown_item} ${
                    index === activeIndex ? styles.dropdown_item_selected : ""
                }`}
                {...getItemProps({
                    onClick: () => handleSelect(department, index),
                })}
                disabled={ index === activeIndex ? true : undefined}
                >
                {department.name}
                </button>
            ))}
            </div>
        )}
        </div>
    );
    
    async function fetchNovaPostDepartments(query: string) {
        try{
            const response = await fetch(novaPostApiAddress, {
                method: 'post',
                body: JSON.stringify({
                    "apiKey": novaPostApiKey,
                    "modelName": "AddressGeneral",
                    "calledMethod": "getWarehouses",
                    "methodProperties": {
                        "FindByString" : `${query}`,
                        "CityName" : `${city}`,
                        "Language" : "UA",
                        "TypeOfWarehouseRef" : `${isDepartment ? departmentRef : postomatRef}`
                    },
                })
            })

            if(response.status === 200){
                const data = await response.json();
console.log(data)
                var length = data.data.length
                if(length > 20){
                    console.log("more specific request required")
                    return
                }
                setDepartments(data.data.map((department:any ) => ({
                    name: department.Description
                })));
                setIsOpen(true)
                console.log("nova post departments: ", data.data)

            }
        } catch(err){
            console.error("failed to fetch offer data: ", err)
        }
    }

    // function parseDepartmentInfo(departmentString: string) {
    //     const [namePart, rest] = departmentString.split('(');
        
    //     const weightMatch = rest.match(/^(.*?)\)/);
    //     const weight = weightMatch ? weightMatch[1] : '';
        
    //     const addressParts = rest.split(':');
    //     const address = addressParts.length > 1 ? addressParts[1].trim() : '';
        
    //     return {
    //         name: namePart.trim(),
    //         weight: weight.trim(),
    //         address: address.trim()
    //     };
    // }
}

export default DepartmentDropdown;