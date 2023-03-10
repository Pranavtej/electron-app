
#!/bin/bash


linux_dep=( zenity curl parallel python3-pip git libcurl4-openssl-dev \
        libmagick++-dev libmariadbclient-dev libssl-dev)

zenity --question --text="Do you want to install this package?"
if [[ $? -eq 0 ]]; then sudo apt-get install package
else zenity --warning   
fi

if [[ -n "$( uname | grep Darwin)" ]]
        then
        
        for i in ${linux_dep[@]}
                do
                echo "
              #########################################
                           System is macOS 
              #########################################  
                         Checking dependencies
              ######################################### 
                     Installing the $i !!
              #########################################"
                brew install $i
                done                        

elif [[ -n "$(expr substr $(uname -s) 1 5 | grep Linux)" ]]
        then
        
        if [[ -n "$(awk -F= '/^NAME/{print $2}' /etc/os-release | tr -d '"' \
                | grep Ubuntu)" ]]
                then
                
                sudo apt-get update -y
                sudo apt-get upgrade -y
                for i in ${linux_dep[@]}
                        do
                        echo "
              #########################################
                           System is Ubuntu
              #########################################  
                         Checking dependencies
              ######################################### 
                     Installing the $i !!
              #########################################"
                        sudo apt-get install -y $i
                        done

        elif [[ -n "$(awk -F= '/^NAME/{print $2}' /etc/os-release | tr -d '"' \
                | grep CentOS)" ]]
                then
                
                sudo yum update -y
                sudo yum upgrade -y
                for i in ${linux_dep[@]}
                        do
                        echo "
              #########################################
                           System is CentOS
              #########################################  
                         Checking dependencies
              ######################################### 
                     Installing the $i !!
              #########################################"
                        sudo yum install -y $i
                        done
        fi
        
 fi
            



script_dir=$PWD

###########################    ##############################

 
if [[ -z "$(which curl | grep curl)" ]]
        then 

	sudo mkdir -p $HOME/C_files/application
	cd $HOME/C_files/application
	wget -c https://github.com/curl/curl/releases/download/curl-7_55_0/curl-7.55.0.tar.gz 
	tar -xvzf curl-7.55.0.tar.gz
	rm curl-7.55.0.tar.gz
	cd curl-7.55.0/  
	sudo ./configure
	sudo make 
	sudo make install
	cd ..
fi

###########################    ##############################


if [[ (-z "$(which conda | grep conda)") && (-n "$( uname | grep Darwin)") ]]
        then
        
        echo "
              #########################################
              System is macOS and conda is not installed
              #########################################  
                         So let's install it
              ######################################### 
                     Installing Miniconda now !!
              #########################################
        
        For further reading visit https://docs.conda.io/projects/conda/en/latest/user-guide/install/linux.html
              #########################################"
        curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
        sudo bash Miniconda3-latest-MacOSX-x86_64.sh -b
        eval "$($HOME/miniconda3/bin/conda shell.zsh hook)"
        source $HOME/miniconda3/bin/activate
        sudo mkdir -p $HOME/miniconda3/c_pkgs
        sudo conda config --add pkgs_dirs c_pkgs

        ## Creating and activating conda environment named base
        rm Miniconda3-latest-MacOSX-x86_64.sh -b
        echo "
              ##########################################
                        Miniconda is Installed 
                         on your macOS system  
                      NGS environment is created
                            and activated   
              ##########################################
              "
        
elif [[ (-z "$(which conda | grep conda)") && (-n "$(expr substr $(uname -s) 1 5 \
        | grep Linux)") ]]
        then
        
        echo "
              #########################################
                System is LINUX and conda is not installed
              #########################################  
                         So let's install it
              ######################################### 
                     Installing Miniconda now !!
              #########################################
        
        For further reading visit https://docs.conda.io/projects/conda/en/latest/user-guide/install/linux.html
              #########################################"
        curl -O https://repo.anaconda.com/miniconda/Miniconda3-py39_4.11.0-Linux-x86_64.sh
        sudo bash Miniconda3-py39_4.11.0-Linux-x86_64.sh -b 
        eval "$($HOME/miniconda3/bin/conda shell.bash hook)"
        source ~/.bashrc
        
        ## Creating and activating conda environment named ngs
        rm Miniconda3-py39_4.11.0-Linux-x86_64.sh
        echo "
              ##########################################
                        Miniconda is Installed 
                         on your Linux system  
                      NGS environment is created
                            and activated   
              ##########################################
              "
elif [[ (-n "$(which conda | grep conda)") && (-n "$( uname | grep Darwin)") ]]
        then
        
        sudo mkdir -p $HOME/miniconda3/c_pkgs
        sudo conda config --add pkgs_dirs c_pkgs

elif [[ (-n "$(which conda | grep conda)") && (-n "$(expr substr $(uname -s) 1 5 \
        | grep Linux)") && (-n "$(conda env list | grep ngs)") ]]
        then
        
        if [[ -d ~/miniconda3 ]]
        then
       
        source ~/miniconda3/etc/profile.d/conda.sh
        conda activate ngs
        echo "
              ##########################################
                    Miniconda is already Installed
                      NGS environment is present
                          NGS is Activated      
              ##########################################
              "
        elif [[ -d ~/anaconda3 ]]
        then
       
        source ~/anaconda3/etc/profile.d/conda.sh
        conda activate ngs
        echo "
              ##########################################
                    Anaconda is already Installed
                      NGS environment is present
                          NGS is Activated      
              ##########################################
              "
        fi

elif [[ (-n "$(which conda | grep conda)") && (-z "$(conda env list | grep ngs)") \
        &&  (-n "$(expr substr $(uname -s) 1 5 | grep Linux)") ]]
        then
        
        conda create -q -y -n ngs python=3
	conda init bash
	source ~/.bashrc
        
        if [[ -d ~/miniconda3 ]]
        then
       
        source ~/miniconda3/etc/profile.d/conda.sh
        conda activate ngs
        echo "
              #########################################
                    NGS is created and activated
              #########################################  
        "
        elif [[ -d ~/anaconda3 ]]
        then
       
        source ~/anaconda3/etc/profile.d/conda.sh
        conda activate ngs
        echo "
              #########################################
                    NGS is created and activated
              #########################################  
        "
        fi
fi

conda_dep=( fastqc multiqc hisat2 samtools stringtie gffcompare gffread)

for i in ${conda_dep[@]}
        do

        if [[ -z "$(which $i | grep $i)" ]]
        then
                echo "
                      #########################################
                               $i not installed
                      #########################################  
                                So lets install it
                      #########################################
                              Installing $i now !!
                      #########################################
                      "
                conda install -q -y -c bioconda $i

                echo "
                      ##########################################

                                   Installed $i

                      ##########################################
                      "

                echo $i

        elif [[ (-n "$(which $i | grep $i)") && (-z "$(which $i | grep envs)") ]]
        then

                echo "
                      #########################################
                               $i not installed on env
                      #########################################  
                                So let install it
                      #########################################
                              Installing $i now !!
                      #########################################
                      "
                conda install -q -y -c bioconda $i

                echo "
                      ##########################################

                                   Installed $i

                      ##########################################
                      "
        elif [[ (-z "$(which $i | grep $i)") && (-z "$(which $i | grep envs)") ]]
        then
                echo "
                      #########################################
                               $i not installed on env
                      #########################################  
                                So let install it
                      #########################################
                              Installing $i now !!
                      #########################################
                      "
                conda install -q -y -c bioconda $i

                echo "
                      ##########################################

                                   Installed $i

                      ##########################################
                      "



        else
                echo "
                              ##########################################

                                     $i is already installed

                              ##########################################
                              "
        fi
done






if [[ -z "$(which htseq-count | grep htseq-count)" ]]
then
        echo "
              #########################################
                         htseq not installed
              #########################################  
                         So let's install it
              #########################################
                       Installing htseq now !!
              #########################################
              "
        conda install -q -y -c bioconda htseq
        
        echo "
              ##########################################
              
                          Installed htseq      
                        
              ##########################################
              "
               
else
      	echo "
              ##########################################
              
                     htseq is already installed      
                        
              ##########################################
              "
fi



if [[ -z "$(which R | grep R)" ]]
then
        echo "
              #########################################
                   r not installed on the system
              #########################################  
                        So let's install it
              #########################################
                         Installing r now !!
              #########################################
              "
             
             
        conda config --add channels conda-forge
        conda config --set channel_priority strict
        conda install -q -y -c conda-forge r-base
        
             
        echo "
              ##########################################
              
                           Installed r      
                        
              ##########################################
              "
elif [[ ( -n "$(which R | grep R)") && (-z "$(which R | grep envs)") ]]
then
        echo "
              #########################################
                   r not installed on conda env
              #########################################  
                         So let's install it
              #########################################
                       Installing r now !!
              #########################################
              "
             
             
        conda config --add channels conda-forge
        conda config --set channel_priority strict
        conda install -q -y -c conda-forge r-base
        
             
        echo "
              ##########################################
              
                          Installed r      
                        
              ##########################################
              "

elif [[ (-n "$(which R | grep envs)") && ( $(R --version | grep "R version" \
        | cut -d " " -f3 | cut -d "." -f1) -le 3 ) ]]
then
      	
                
                
        echo "
        ##########################################
        
         r is already installed but version is <4      
                  
        ##########################################
        
                     So let's update it
        
        ##########################################
        "
        
        conda config --add channels conda-forge
        conda config --set channel_priority strict
        conda update -y -q -c conda-forge r-base
        echo "
                ##########################################
                
                       Updated R version to current one      
                          
                ##########################################
                "
	
fi                     

# download and place Trimmomatic
d1=$HOME/C_files/application
f1=$HOME/C_files/application/Trimmomatic-0.39.zip
if [[ ! -d "$d1" ]]
then
	mkdir -p $HOME/C_files/application
	if [[ ! -f "$f1" ]]
        then
		curl -O http://www.usadellab.org/cms/uploads/supplementary/Trimmomatic/Trimmomatic-0.39.zip
		mv Trimmomatic-0.39.zip $d1
		cd $d1
		unzip Trimmomatic-0.39.zip
	
	fi
elif [[ (-d "$d1") && (! -f "$f1") ]]
then
        curl -O http://www.usadellab.org/cms/uploads/supplementary/Trimmomatic/Trimmomatic-0.39.zip
	mv Trimmomatic-0.39.zip $d1
	cd $d1
	unzip Trimmomatic-0.39.zip
elif [[ (! -d $HOME/C_files/application/Trimmomatic-0.39) && ( -f "$f1") ]]
then
        unzip $f1
else 
        echo" Trimmomatic is present"

fi

# install CPAT

if [[ -z "$(which cpat.py | grep cpat.py)" ]]
then
        pip3 install CPAT
else 
        echo "CPAT is present"
fi
#downloading Cpat files

#mkdir -p /opt/genome/human/CPAT
#curl -OL "https://github.com/schosio/CHOLAR/blob/f713ab972a42e31dac29e155053c606eed67826c/files/Human.logit.RData"
#mv Human.logit.RData /opt/genome/human/CPAT

#curl -OL "https://github.com/schosio/CHOLAR/blob/f713ab972a42e31dac29e155053c606eed67826c/files/Human_Hexamer_hg38.tsv"
#mv Human_Hexamer_hg38.tsv /opt/genome/human/CPAT



# Downloading Reference annotation file from Gencode

d2=$HOME/C_files/genome/human/hg38/annotation
f2=$HOME/C_files/genome/human/hg38/annotation/gencode.v40.chr_patch_hapl_scaff.annotation.gtf
if [[ (! -d "$d2") && (! -f "$f2") ]]
then
	mkdir -p $HOME/C_files/genome/human/hg38/annotation
        curl -OL "https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_40/gencode.v40.chr_patch_hapl_scaff.annotation.gtf.gz"
	sudo mv *.annotation.gtf.gz $HOME/C_files/genome/human/hg38/annotation
	cd $HOME/C_files/genome/human/hg38/annotation
	sudo gzip -d gencode.v40.chr_patch_hapl_scaff.annotation.gtf.gz
elif [[ ( -d "$d2") && (! -f "$f2") ]]
then
        curl -OL "https://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_40/gencode.v40.chr_patch_hapl_scaff.annotation.gtf.gz"
	sudo mv *.annotation.gtf.gz $HOME/C_files/genome/human/hg38/annotation
	cd $HOME/C_files/genome/human/hg38/annotation
	sudo gzip -d gencode.v40.chr_patch_hapl_scaff.annotation.gtf.gz
else
        echo " Annotation file is present"
		
fi

# create splice site file
f3=$HOME/C_files/genome/human/hg38/annotation/gencode.v40.splicesite.annotation.ss
if [[ ! -f "$f3" ]]
then
	hisat2_extract_splice_sites.py $HOME/C_files/genome/human/hg38/annotation/gencode.v40.chr_patch_hapl_scaff.annotation.gtf \
         > gencode.v40.splicesite.annotation.ss
else 
        echo "splice site file is present"
fi
# Downloading reference genome

d3=$HOME/C_files/genome/human/hg38/ref_gen
f4=$HOME/C_files/genome/human/hg38/ref_gen/hg38.fa

if [[ (! -d "$d3") && (! -f "$f4") ]]
then
	mkdir -p $HOME/C_files/genome/human/hg38/ref_gen
        cd $script_dir
	curl -OL "http://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/hg38.fa.gz"
	mv hg38.fa.gz $HOME/C_files/genome/human/hg38/ref_gen
	cd $HOME/C_files/genome/human/hg38/ref_gen
	gzip -d hg38.fa.gz

elif [[ (-d "$d3") && (-f "$f4.gz") && (! -f "$f4") ]]
then
        rm *.gz
        cd $script_dir
	curl -OL "http://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/hg38.fa.gz"
	mv hg38.fa.gz $HOME/C_files/genome/human/hg38/ref_gen
	cd $HOME/C_files/genome/human/hg38/ref_gen
	gzip -d hg38.fa.gz

elif [[ (-d "$d3") && (! -f "$f4") ]]
then
	cd $script_dir
	curl -OL "http://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/hg38.fa.gz"
	mv hg38.fa.gz $HOME/C_files/genome/human/hg38/ref_gen
	cd $HOME/C_files/genome/human/hg38/ref_gen
	gzip -d hg38.fa.gz
else
        echo " reference genome file is present"

fi

#index building 

f5=$HOME/C_files/genome/human/hg38/ref_gen/hg38.1.ht2
if [[ ! -f "$f5" ]]
then
	hisat2-build hg38.fa hg38.fa
else
        echo " indexed genome is present"
fi
# Installing R packages

Rscript $script_dir/source/conf.R